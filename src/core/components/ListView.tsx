
import React from 'react';
import type { FlatListProps ,ViewStyle} from 'react-native';
import { FlatList, ActivityIndicator, StyleSheet, Text, RefreshControl, View } from 'react-native';


interface IListShowProps extends Omit<FlatListProps<any>, 'data'>{
    query1:any
    query2?:any
    queryParams:Record<string, string|number|boolean>
    selector?:(value:any)=> void
    header?:{
      isScrollable?:boolean,
      render: (item:any)=> React.JSX.Element
    }
}
interface ScreenLoadingProps  {
  style?: ViewStyle
}


let page = 0;
const limit = 10;

function ListShow(props: IListShowProps) {
  const {
    query1,
    query2,
    queryParams,
    selector,
    header,
    ...extra
  } = props;

  const [refreshing, setRefreshing] = React.useState(false);

  const {data, isLoading, isFetching, refetch, isError} = query1(queryParams);
  const [get, res] = query2();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    page = 0;
    refetch()
      .then(()=>{
        setRefreshing(false);
      })
      .catch(()=> {
        setRefreshing(false);
      });
  }, [refetch]);

  const handleMore = async () => {
    if (isFetching || isLoading || res.isFetching || res.isLoading || !data?._embedded?.events ||  (data?._embedded?.events && data?._embedded?.events.length < limit)) return;
    if(res.data && !((res.data?._embedded?.events?.length || 0) >= limit)) {
      return;
    }
    if(res.isError) {
      return;
    }
    page += 1;
    get({ page, ...queryParams});
  };

  const getHeader = () => {
    if (!header) return {};
    const obj:Record<string, any> = {
      ListHeaderComponent : ((isFetching || isLoading) && !refreshing ) ? <ActivityIndicator size="small" color="#000" /> : header.render(data),
    };
    if(!header.isScrollable) {
      obj.stickyHeaderIndices = [0];
    }
    return obj;
  };


  if(queryParams?.city && (isLoading || isFetching)) {
    return <ScreenLoading style={styles.empty}/> 
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
      data={(selector && data) ? selector(data) : (data?._embedded?.events || [])}
      onEndReached={handleMore}
      keyExtractor={(item, index) => item.id.toString() + index}
      onEndReachedThreshold={0.1}
      contentContainerStyle={styles.container}
      ListEmptyComponent={(!data && (isLoading || isFetching)) ? <ScreenLoading style={styles.empty}/> : isError ? <Text style={styles.empty}>Error occurred</Text> : <Text style={styles.empty}>No data found</Text>}
      ListFooterComponent={(res.isLoading || res.isFetching) ?  <ActivityIndicator size="small" color="#000" />  :res.isError ? <Text style={styles.empty}>Error occurred</Text> : null}
      {...getHeader()}
      {...extra}
    />
  );
}

export default ListShow;





function ScreenLoading(props: ScreenLoadingProps) {
  return (
    <View style={{ flex:1,justifyContent:'center', alignItems:'center', ...props.style}}>
      <ActivityIndicator size={'large'}/>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    paddingBottom: 100,
    padding: 12,
  },
  empty:{
    paddingTop: 20,
    textAlign:'center',
  },
});
  
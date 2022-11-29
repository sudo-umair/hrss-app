import { StyleSheet, FlatList, View, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import RenderItem from '../../components/Resources/RenderItem';
import NoResults from '../../components/Resources/NoResults';
import SearchBar from '../../components/UI/SearchBar';
import { getResourceRequestsList } from '../../utilities/routes/resource';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

export default function FeedScreen({ navigation, route }) {
  const { filterType } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const { email } = user;

  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getResourceRequests = async () => {
    setIsLoading(true);
    console.log('running getResourceRequests');
    const response = await getResourceRequestsList({
      userType: 'user',
    });
    if (response.status === '200') {
      filterRequests(response.results);
    } else {
      showMessage({
        message: response.message,
        type: 'warning',
        icon: 'warning',
      });
    }
    setIsLoading(false);
  };

  const filterRequests = (requests) => {
    if (filterType === 'all') {
      const filteredRequestsReversed = requests
        .filter(
          (item) =>
            item.requestStatus === 'Pending' &&
            item.requestedByEmail !== email &&
            item.ignoredBy.includes(email) === false
        )
        .reverse();
      setFilteredRequests(filteredRequestsReversed);
    } else if (filterType === 'myRequests') {
      const filteredRequestsReversed = requests
        .filter((item) => item.requestedByEmail === email)
        .reverse();
      setFilteredRequests(filteredRequestsReversed);
    } else if (filterType === 'approved') {
      const filteredRequestsReversed = requests
        .filter(
          (item) =>
            item.approvedByEmail === email && item.requestStatus === 'Approved'
        )
        .reverse();
      setFilteredRequests(filteredRequestsReversed);
    }
  };

  const onSearch = (text) => {
    const results = filteredRequests.filter((item) => {
      return item.resourceName.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResults(results);
    setSearchText(text);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getResourceRequests();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.rootContainer}>
      <SearchBar
        onChangeText={onSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <FlatList
        data={searchText === '' ? filteredRequests : searchResults}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item._id.toString()}
        ListEmptyComponent={NoResults}
        keyboardDismissMode='on-drag'
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        contentContainerStyle={styles.listContent}
        style={styles.listContainer}
        onRefresh={getResourceRequests}
        refreshing={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '4%',
  },

  listContainer: {
    width: '100%',
  },
  listContent: {
    paddingBottom: '4%',
    paddingHorizontal: '4%',
  },
});

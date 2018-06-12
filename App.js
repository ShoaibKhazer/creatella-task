/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Dimensions,
  View
} from 'react-native';
const { height, width } = Dimensions.get('window');

import { getAdId, getTimeSince } from "./src/utils/utils";
import { get, SERVER_BASE_URL } from "./src/networkhandler/networkHandler";

import Header from './src/components/Header';
import SortMenu from './src/components/SortMenu';
import Catalog from "./src/catalog/Catalog";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      page: 1,
      apiUrl: '/api/products?_page=',
      endOfCatalog: false,
    }
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    let { page, products, apiUrl } = this.state;
    let url = apiUrl + page + '&_limit=15'
    get(url)
      .then((res) => {
        if (res.length > 1) {
          this.setState({
            products: products.concat(res),
            page: page + 1,
          })
        }
        else {
          this.setState({
            endOfCatalog: true
          })
        }

      })
  }

  sortProducts(value) {
    this.setState({
      apiUrl: '/api/products?_sort=' + value + '&_page=',
      products: [],
      page: 1,
      endOfCatalog: false
    }, this.fetchProducts);
  }

  render() {
    let { endOfCatalog, apiUrl, products } = this.state;


    return (
      <View style={styles.container}>
        <Header
          headerText={'Products Grid'}
        />
        <SortMenu
          onSubmit={(value) => this.sortProducts(value)}
        />
        <Catalog
          apiUrl={apiUrl}
          products={products}
          loadMoreProducts={this.fetchProducts}
          endOfCatalog={endOfCatalog}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
});

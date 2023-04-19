import React, { useEffect } from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Chargebee, { AuthenticationDetail, Product, ProductIdentifiersRequest, SubscriptionsRequest } from '@chargebee/react-native-chargebee';

export default function App() {
  const site = 'cb-imay-test';
  const apiKey = '++';
  const iOsSdkKey = '++';
  const androidSdkKey = '++';

  let productIdentifiers: string[] = [];
  let products: Product[] = [];

  useEffect(() => {
    configure(site, apiKey, androidSdkKey, iOsSdkKey);
  }, []);

  const retrieveProductIdentifiers = async () => {
    const queryParams: ProductIdentifiersRequest = {
      limit: '10',
      offset: '1',
    };
    try {
      const result = await Chargebee.retrieveProductIdentifiers(queryParams);
      console.log(result);
      productIdentifiers = result;
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: Refactor Examples
  const retrieveProducts = async () => {
    try {
      const result = await Chargebee.retrieveProducts(productIdentifiers);
      products = result;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseProduct = async () => {
    try {
      const result = await Chargebee.purchaseProduct(
        products[0]?.id!,
        'customer'
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveSubscription = async () => {
    try {
      const subscriptionRequests: SubscriptionsRequest = { customer_id: 'qwerty' };
      const result = await Chargebee.retrieveSubscriptions(subscriptionRequests);
      products = result;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const configure = async (site: string, apiKey: string, androidSdkKey: string, iOsSdkKey: string) => {

    try {
      const configResult: AuthenticationDetail = await Chargebee.configure({
        site: site,
        publishableApiKey: apiKey,
        androidSdkKey: androidSdkKey,
        iOsSdkKey: iOsSdkKey,
      });
      console.log('SDK Configuration completeddd:', configResult);
    } catch (error) {
      console.error('SDK Configuration failed', error);
      };
  };

  return (
    <View style={styles.container}>
      <Button
        title="Configure"
        onPress={() => configure(site, apiKey, androidSdkKey, iOsSdkKey)}
      />
      <Button
        title="Retrieve Product Identifers"
        onPress={retrieveProductIdentifiers}
      />
      <Button title="Retrieve Products" onPress={retrieveProducts} />
      <Button title="Purchase Product" onPress={purchaseProduct} />
      <Button title="Retrieve Subscription" onPress={retrieveSubscription} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Allocation from '../model/Allocation';
import { withObservables } from '@nozbe/watermelondb/react';
import AccountAllocation from '../model/AccountAllocation';
import AccountAllocationItem from './AccountAllocationItem';
import numeral from 'numeral'
import { accountAllocationCollection } from '../db';

type AllocationListItem = {
  allocation: Allocation;
  accountAllocations: AccountAllocation[];
};

const AllocationListItem = ({
  allocation,
  accountAllocations,
}: AllocationListItem) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>
          {allocation.createdAt.toLocaleDateString()}
        </Text>
        <Text style={styles.income}>{numeral(allocation.income).format('0,0')},000VNĐ</Text>
      </View>

      <View style={{ gap: 5, padding: 10 }}>
        {accountAllocations.map((item) => (
          <AccountAllocationItem key={item.id} accountAllocation={item} />
        ))}
      </View>
    </View>
  );
};

const enhance = withObservables(
  ['allocation'],
  ({ allocation }: { allocation: Allocation }) => ({
    allocation,
    accountAllocations: allocation.accountAllocations,
  })
);

export default enhance(AllocationListItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fad7da',
    // top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F43F5E',
    padding: 10,
  },
  income: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  date:{
    color: 'white',
    fontWeight: 'bold',
  },
});

import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SortableTree, { getFlatDataFromTree, getTreeFromFlatData, changeNodeAtPath } from 'react-sortable-tree';
import { Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';
import PropTypes from 'prop-types';




export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export default function Cart() {
  const initialData = [
    { id: '1', name: 'N1', parent: null },
    { id: '2', name: 'N2', parent: null },
    { id: '3', name: 'N3', parent: 2 },
    { id: '4', name: 'N4', parent: 3 },
  ];
  const getNodeKey = ({ treeIndex }) => treeIndex;
  const [treeData, setTreeData] = useState(
    getTreeFromFlatData({
      flatData: initialData.map(node => ({ ...node, title: node.name })),
      getKey: node => node.id, // resolve a node's key
      getParentKey: node => node.parent, // resolve a node's parent's key
      rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
    }),
  );
  const flatData = getFlatDataFromTree({
    treeData: treeData,
    getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
    ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
  }).map(({ node, path }) => ({
    id: node.id,
    name: node.name,

    // The last entry in the path is this node's key
    // The second to last entry (accessed here) is the parent node's key
    parent: path.length > 1 ? path[path.length - 2] : null,
  }));
  const { data, loading, error } = useQuery(GET_CART_ITEMS);
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <Fragment>
      âtreeData for this tree was generated from flat data similar to DB rowsâ
          <div style={{ height: 250 }}>
        <SortableTree
          treeData={treeData}
          onChange={treeData => setTreeData(treeData)}
          generateNodeProps={({ node, path }) => ({
            title: (
              <input
                style={{ fontSize: '1.1rem' }}
                value={node.name}
                onChange={event => {
                  const name = event.target.value;

                  setTreeData(
                    changeNodeAtPath({
                      treeData: treeData,
                      path,
                      getNodeKey,
                      newNode: { ...node, name },
                    }),
                  );
                }}
              />
            ),
          })}
        />
      </div>
    </Fragment>
  );
}

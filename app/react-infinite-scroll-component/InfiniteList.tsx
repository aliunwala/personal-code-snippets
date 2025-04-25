// src/components/InfiniteList.tsx
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const BATCH_SIZE = 15; // How many items to fetch at a time
const TOTAL_ITEMS = 100; // Simulate a total number of available items
// src/types.ts
export interface Item {
  id: number;
  text: string;
}

const InfiniteList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1); // Track current page/batch

  // Simulate fetching data from an API
  const fetchData = async (currentPage: number): Promise<Item[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Fetching page ${currentPage}`);

    const newItems: Item[] = [];
    const startId = (currentPage - 1) * BATCH_SIZE + 1;
    const endId = Math.min(startId + BATCH_SIZE - 1, TOTAL_ITEMS);

    for (let i = startId; i <= endId; i++) {
      newItems.push({ id: i, text: `Item #${i}` });
    }
    return newItems;
  };

  // Function called by InfiniteScroll to load more items
  const fetchMoreData = async () => {
    if (items.length >= TOTAL_ITEMS) {
      setHasMore(false);
      return;
    }

    // Fetch the next batch of data
    const newItems = await fetchData(page + 1); // Fetch next page

    // Append new items to the existing list
    setItems((prevItems) => [...prevItems, ...newItems]);

    // Increment page number
    setPage((prevPage) => prevPage + 1);

    // Check if there are still more items to load
    setHasMore(items.length + newItems.length < TOTAL_ITEMS);
  };

  // Load initial data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      const initialItems = await fetchData(1); // Fetch page 1
      setItems(initialItems);
      setPage(1);
      setHasMore(initialItems.length < TOTAL_ITEMS);
    };

    loadInitialData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-4 border border-gray-300 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Infinite Scroll Demo
      </h1>
      {/*
        IMPORTANT: For InfiniteScroll to work correctly within a specific container,
        that container needs a defined height and overflow-y: scroll.
        We assign an ID ("scrollableDiv") to it and pass this ID to the
        `scrollableTarget` prop of InfiniteScroll.
      */}
      <div
        id="scrollableDiv"
        className="h-[60vh] overflow-y-auto border border-gray-200 rounded p-2 bg-gray-50" // Added height, overflow, and styling
      >
        <InfiniteScroll
          dataLength={items.length} // This is important! Provide the current number of items
          next={fetchMoreData} // Function to call when more data is needed
          hasMore={hasMore} // Boolean indicating if there's more data
          loader={
            <h4 className="text-center py-4 text-gray-500 font-semibold">
              Loading...
            </h4>
          } // Loading indicator
          endMessage={
            <p className="text-center py-4 text-green-600 font-bold">
              <b>Yay! You have seen it all</b>
            </p>
          } // Message when all data is loaded
          scrollableTarget="scrollableDiv" // ID of the scrollable container
        >
          {/* Render the items */}
          <div className="space-y-3">
            {" "}
            {/* Add spacing between items */}
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-blue-200 bg-white rounded shadow-sm hover:bg-blue-50 transition-colors duration-150"
              >
                <p className="text-lg text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteList;

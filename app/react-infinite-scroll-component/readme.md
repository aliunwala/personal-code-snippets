## State:

We manage the items array, a hasMore boolean flag, and the current page (or batch number).

## fetchData:

This function simulates fetching data. In a real app, this would be an actual API call (using fetch, axios, etc.). It returns a promise resolving with an array of Item objects.

## fetchMoreData:

This is the core function passed to the next prop of InfiniteScroll. It checks if hasMore is true, calls fetchData for the next page, appends the results to the items state, increments the page state, and updates hasMore based on whether the total item limit has been reached.

## useEffect:

On initial component mount, we call fetchData once to load the first batch of items.

## InfiniteScroll Component:

- dataLength={items.length}: Crucial prop. Tells the component how many items are currently rendered. It uses this to determine if scrolling near the bottom should trigger the next function.
- next={fetchMoreData}: The function to execute when more data needs to be loaded.
- hasMore={hasMore}: Controls whether the next function should be called and whether to show the loader or the endMessage.
- loader: JSX displayed while fetchMoreData is executing (or simply when hasMore is true and the user scrolls down).
- endMessage: JSX displayed when hasMore becomes false.
- scrollableTarget="scrollableDiv": Very important if you want the scroll detection to happen within a specific container (like our div with id="scrollableDiv", height, and overflow-y: auto) instead of the main window. If you omit this, it defaults to the window scroll.

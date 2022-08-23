import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { DigitalProductsSearchResult } from '../pages/api/search-products';
import { VscLoading } from 'react-icons/vsc';
import { HiOutlineSearch } from 'react-icons/hi';
import ProductsTable from './products-table';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

enum LoadingType {
  NONE,
  SEARCH_BOX,
  NEXT_PAGE,
}

const ProductsSearch: FC<{
  searchForDigital: boolean;
  handleProductSelection: Function;
}> = ({ searchForDigital, handleProductSelection }) => {
  const [searchBoxInput, setSearchBoxInput] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [maxReached, setMaxReached] = useState(false);
  const [loadingResults, setLoadingResults] = useState(LoadingType.NONE);
  const [searchResults, setSearchResults] = useState<
    DigitalProductsSearchResult[][] | undefined
  >();

  useEffect(() => {
    setSearchBoxInput('');
    setQuery('');
    setPage(1);
    setMaxReached(false);
    setSearchResults(undefined);
  }, [searchForDigital]);

  function fetchProducts(query: string, page: number) {
    setLoadingResults(
      page === 1 ? LoadingType.SEARCH_BOX : LoadingType.NEXT_PAGE
    );
    axios
      .get('/api/search-products', {
        params: {
          query: query,
          page: page,
          isDigital: searchForDigital,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setMaxReached(true);
          if (page === 1) {
            setSearchResults(undefined);
          }
        } else {
          setPage(page);
          if (page === 1) {
            // i.e., if the query is new
            setSearchResults([response.data]);
            setMaxReached(false);
          } else {
            setSearchResults(searchResults!.concat([response.data]));
          }
        }
        setLoadingResults(LoadingType.NONE);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className={'my-3'}>
        <h3>What product would you like to review?</h3>
        <div className='form-control mt-3'>
          <div className='input-group'>
            <input
              type='text'
              value={searchBoxInput}
              placeholder='Search…'
              className='input input-bordered w-64'
              onChange={(e) => setSearchBoxInput(e.target.value)}
            />
            <button
              className={'btn btn-square'}
              onClick={() => {
                setQuery(searchBoxInput);
                fetchProducts(searchBoxInput, 1);
              }}
            >
              {loadingResults === LoadingType.SEARCH_BOX ? (
                <VscLoading className={'w-6 h-6 animate-spin'} />
              ) : (
                <HiOutlineSearch className={'w-6 h-6'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {searchResults === undefined && maxReached && (
        <div className={'my-5 text-center text-base-content/25 italic'}>
          <p>
            We couldn&apos;t find any results for this query.
            <br />
            Maybe check your spelling?
          </p>
        </div>
      )}

      {searchResults !== undefined && searchResults[0].length > 0 && (
        <>
          <div className={'mt-8 mb-6'}>
            <ProductsTable
              products={searchResults[page - 1]}
              buttonContent={'Select'}
              onClick={(product: DigitalProductsSearchResult) => {
                setMaxReached(false);
                setSearchResults(undefined);
                handleProductSelection(product);
              }}
            />
          </div>

          {maxReached && page + 1 > searchResults.length && (
            <div className={'my-5 text-center text-base-content/25 italic'}>
              <p>No more results. Maybe broaden your search?</p>
            </div>
          )}

          <div className={'flex place-content-center place-items-center my-2'}>
            <div className='btn-group'>
              <button
                className='btn'
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              >
                <FiArrowLeft />
              </button>

              <button className='btn no-animation cursor-default hover:bg-neutral hover:border-neutral'>
                Page {page}
              </button>

              <button
                className='btn'
                onClick={() => {
                  if (searchResults.length < page + 1) {
                    fetchProducts(query, page + 1);
                  } else {
                    setPage(page + 1);
                    console.log('page increased from body');
                  }
                }}
                disabled={maxReached && page + 1 > searchResults.length}
              >
                {loadingResults === LoadingType.NEXT_PAGE ? (
                  <VscLoading className={'animate-spin'} />
                ) : (
                  <FiArrowRight />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsSearch;

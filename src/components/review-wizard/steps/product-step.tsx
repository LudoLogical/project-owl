import { ChangeEvent, FC, useState } from 'react';
import Image from 'next/image';
import Review from '../../../model/review';
import RecursivePartial from '../../../utils/recursive-partial';
import axios from 'axios';
import { GamesSearchResult } from '../../../pages/api/search-games';
import {
  getIGDBImageFromID,
  IGDB_IMAGE_RESOLUTIONS,
  IGDBImageType,
} from '../../../utils/igdb/igdb-frontend-utils';
import { timestampFormatDMY } from '../../../utils/timestamp-format';
import { HiOutlineSearch } from 'react-icons/hi';
import { VscLoading } from 'react-icons/vsc';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa';

enum LoadingType {
  NONE,
  SEARCH_BOX,
  NEXT_PAGE,
}

const ProductStep: FC<{
  review: RecursivePartial<Review>;
  setReview: Function;
  setCanAdvance: Function;
}> = ({ review, setReview, setCanAdvance }) => {
  const [searchBoxInput, setSearchBoxInput] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [maxReached, setMaxReached] = useState(false);
  const [loadingResults, setLoadingResults] = useState(LoadingType.NONE);
  const [searchResults, setSearchResults] = useState<
    GamesSearchResult[][] | undefined
  >();

  function handleIsDigitalSelection(event: ChangeEvent<HTMLInputElement>) {
    setSearchResults(undefined);
    setPage(1);
    setQuery('');
    setMaxReached(false);
    setSearchBoxInput('');
    setReview({
      ...review,
      subject: {
        ...review.subject,
        productIsDigital: event.target.value === 'digital',
      },
    });
  }

  function fetchGames(query: string, page: number) {
    setLoadingResults(
      page === 1 ? LoadingType.SEARCH_BOX : LoadingType.NEXT_PAGE
    );
    axios
      .get('/api/search-games', {
        params: {
          query: query,
          page: page,
          isDigital: review.subject?.productIsDigital,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setMaxReached(true);
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
      <h3>
        First thing&apos;s first: is this review for a digital product or a
        physical one?
      </h3>

      <div className={'form-control m-3'}>
        <label className={'label cursor-pointer justify-start'}>
          <input
            type={'radio'}
            name={'radio-1'}
            value={'digital'}
            className={'radio'}
            onChange={(e) => handleIsDigitalSelection(e)}
          />
          <span className={'label-text ml-3'}>Digital</span>
        </label>
        <label className={'label cursor-pointer justify-start'}>
          <input
            type={'radio'}
            name={'radio-1'}
            value={'physical'}
            className={'radio'}
            onChange={(e) => handleIsDigitalSelection(e)}
          />
          <span className={'label-text ml-3'}>Physical</span>
        </label>
      </div>

      {review.subject?.productIsDigital !== undefined &&
        review.subject?.productIsDigital !== null && (
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
                    fetchGames(searchBoxInput, 1);
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
        )}

      {searchResults !== undefined && (
        <>
          <table className='table table-auto w-full mt-8 mb-6'>
            <tbody>
              {searchResults[page - 1].map((result, index) => (
                <tr key={index}>
                  <td>
                    <div className={'flex flex-row items-center'}>
                      {result.cover ? (
                        <Image
                          src={getIGDBImageFromID(
                            result.cover.image_id,
                            IGDBImageType.S_COVER
                          )}
                          width={
                            IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][0]
                          }
                          height={
                            IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][1]
                          }
                          alt={'(Cover Art)'}
                          layout={'fixed'}
                          objectFit={'contain'}
                        />
                      ) : (
                        <div
                          className={
                            'flex place-content-center place-items-center w-[90px] h-[128px] ' +
                            'bg-base-300'
                          }
                        >
                          <FaGamepad
                            size={
                              IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][0] -
                              30
                            }
                          />
                        </div>
                      )}

                      <div className={'flex flex-col flex-1 px-5'}>
                        <h4 className={'text-lg whitespace-normal'}>
                          {result.name}
                        </h4>
                        <p className={'text-base-content/50 whitespace-normal'}>
                          {result.first_release_date
                            ? timestampFormatDMY(
                                result.first_release_date * 1000
                              )
                            : 'Release Date Unknown'}
                          <br />
                          {result.platforms
                            ? result.platforms.map(
                                (platform, index) =>
                                  platform.name +
                                  (index === result.platforms.length - 1
                                    ? ''
                                    : ', ')
                              )
                            : 'Platforms Unknown'}
                        </p>
                      </div>
                      <button className={'btn btn-primary mr-2'}>Select</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    fetchGames(query, page + 1);
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

export default ProductStep;

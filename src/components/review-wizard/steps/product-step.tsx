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

const ProductStep: FC<{
  review: RecursivePartial<Review>;
  setReview: Function;
}> = ({ review, setReview }) => {
  const [searchBoxInput, setSearchBoxInput] = useState('');
  const [query, setQuery] = useState('');
  const [loadingResults, setLoadingResults] = useState(false);
  const [searchResults, setSearchResults] = useState<
    GamesSearchResult[] | undefined
  >();

  function handleIsDigitalSelection(event: ChangeEvent<HTMLInputElement>) {
    setReview({
      ...review,
      subject: {
        ...review.subject,
        productIsDigital: event.target.value === 'digital',
      },
    });
  }

  function fetchGames(query: string, page: number) {
    setLoadingResults(true);
    axios
      .get('/api/search-games', {
        params: {
          query: query,
          page: page,
          isDigital: review.subject?.productIsDigital,
        },
      })
      .then((response) => {
        setSearchResults(response.data);
        setLoadingResults(false);
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
          <>
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
                  {loadingResults ? (
                    <VscLoading className={'w-6 h-6 animate-spin'} />
                  ) : (
                    <HiOutlineSearch className={'w-6 h-6'} />
                  )}
                </button>
              </div>
            </div>
          </>
        )}

      {searchResults !== undefined && (
        <table className='table table-auto w-full my-8'>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td
                  className={'p-[16px] w-max'}
                  width={
                    (
                      IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][0] + 32
                    ).toString() + 'px'
                  }
                >
                  <Image
                    src={getIGDBImageFromID(
                      result.cover.image_id,
                      IGDBImageType.S_COVER
                    )}
                    width={IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][0]}
                    height={IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][1]}
                    alt={'(Cover Art)'}
                    layout={'fixed'}
                  />
                </td>
                <td>
                  <h4 className={'text-lg whitespace-normal'}>{result.name}</h4>
                  <p className={'text-base-content/50 whitespace-normal'}>
                    {result.first_release_date
                      ? timestampFormatDMY(result.first_release_date * 1000)
                      : 'Release Date Unknown'}
                    <br />
                    {result.platforms
                      ? result.platforms.map(
                          (platform, index) =>
                            platform.name +
                            (index === result.platforms.length - 1 ? '' : ', ')
                        )
                      : 'Platforms Unknown'}
                  </p>
                </td>
                <td className={'p-[16px] pr-6'} width={'80px'}>
                  <button className={'btn btn-primary'}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProductStep;

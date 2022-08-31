import { ChangeEvent, FC, useEffect, useState } from 'react';
import StepProps from './step-props';
import axios from 'axios';
import {
  DigitalProductsSearchResult,
  PhysicalProductsSearchResult,
} from '../../../pages/api/products';
import { DigitalReleasesSearchResult } from '../../../pages/api/digital-releases';
import { FiCheck, FiEdit2, FiXCircle } from 'react-icons/fi';
import { z } from 'zod';

const ReleasesStep: FC<StepProps> = ({
  review,
  setReview,
  setCanAdvance,
  productDetails,
}) => {
  const [loadingReleases, setLoadingReleases] = useState(false);
  const [digitalReleases, setDigitalReleases] = useState<
    DigitalReleasesSearchResult[] | undefined
  >();

  const [isFirstEdition, setIsFirstEdition] = useState<boolean | undefined>();
  const [showYearError, setShowYearError] = useState(false);
  const [releaseYearInput, setReleaseYearInput] = useState('');
  const [releaseYearInputConfirmed, setReleaseYearInputConfirmed] =
    useState(false);

  function tryGetDigitalReleases(): void {
    if (review.subject!.productIsDigital) {
      const digitalProductDetails =
        productDetails as DigitalProductsSearchResult;
      if (digitalProductDetails.release_dates) {
        setLoadingReleases(true);
        axios
          .get('/api/digital-releases', {
            params: {
              ids: digitalProductDetails.release_dates.map(
                (id, index) =>
                  id.toString() +
                  (index === digitalProductDetails.release_dates!.length - 1
                    ? ''
                    : ', ')
              ),
            },
          })
          .then((response) => {
            setLoadingReleases(false);
            setDigitalReleases(response.data);
          })
          .catch((error) => console.log(error));
      }
    }
  }

  function handleIsFirstEditionSelection(event: ChangeEvent<HTMLInputElement>) {
    const bool = event.target.value === 'yes';
    setIsFirstEdition(bool);
    if (bool) {
      setReleases([
        (productDetails as PhysicalProductsSearchResult).year_published!,
      ]);
      setCanAdvance(true);
    } else {
      setReleases(undefined);
      setCanAdvance(false);
    }
  }

  function setReleases(releases: number[] | undefined) {
    setReview({
      ...review,
      subject: {
        ...review.subject,
        releases: releases,
      },
    });
  }

  useEffect(() => {
    // tryGetDigitalReleases();
    // We disable b/c we don't want to re-run on change of
    // review.subject - that's the job of ProductStep to change!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails]);

  if (review.subject!.productIsDigital) {
    return (
      <>
        <h3>This is the releases step.</h3>
      </>
    );
  } else {
    const physicalProductDetails =
      productDetails as PhysicalProductsSearchResult;
    return (
      <>
        {physicalProductDetails.year_published !== null && (
          <>
            <h3>
              Was your version of {productDetails!.name} released in&nbsp;
              {physicalProductDetails.year_published}?
            </h3>
            <div className={'form-control m-3'}>
              <label className={'label cursor-pointer justify-start'}>
                <input
                  type={'radio'}
                  name={'radio-1'}
                  value={'yes'}
                  className={'radio'}
                  onChange={(e) => handleIsFirstEditionSelection(e)}
                />
                <span className={'label-text ml-3'}>Yes</span>
              </label>
              <label className={'label cursor-pointer justify-start'}>
                <input
                  type={'radio'}
                  name={'radio-1'}
                  value={'no'}
                  className={'radio'}
                  onChange={(e) => handleIsFirstEditionSelection(e)}
                />
                <span className={'label-text ml-3'}>No</span>
              </label>
            </div>
          </>
        )}
        {(physicalProductDetails.year_published === null ||
          (isFirstEdition !== undefined && !isFirstEdition)) && (
          <div className={'my-3'}>
            <h3>
              What year was your version of {productDetails!.name} released in?
            </h3>
            <div className={'form-control mt-3 w-fit'}>
              <div className={'input-group'}>
                <input
                  type={'text'}
                  value={releaseYearInput}
                  placeholder={'Year'}
                  disabled={releaseYearInputConfirmed}
                  className={'input input-bordered w-64'}
                  onChange={(e) => {
                    console.log(e);
                    console.log(releaseYearInput);
                    setReleaseYearInput(e.target.value);
                  }}
                />

                <button
                  className={'btn btn-square'}
                  onClick={() => {
                    if (releaseYearInputConfirmed) {
                      setReleases(undefined);
                      setReleaseYearInputConfirmed(false);
                      setCanAdvance(false);
                    } else {
                      try {
                        const year = z
                          .number()
                          .int()
                          .parse(+releaseYearInput);
                        console.log(year);
                        setShowYearError(false);
                        setReleases([year]);
                        setReleaseYearInputConfirmed(true);
                        setCanAdvance(true);
                      } catch (e) {
                        setShowYearError(true);
                      }
                    }
                  }}
                >
                  {releaseYearInputConfirmed ? (
                    <FiEdit2 className={'w-6 h-6'} />
                  ) : (
                    <FiCheck className={'w-6 h-6'} />
                  )}
                </button>
              </div>
            </div>
            {showYearError && (
              <div className={'alert alert-error shadow-lg mt-5 justify-start'}>
                <FiXCircle className={'w-5 h-5'} />
                <p>The value supplied must be a valid year.</p>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
};

export default ReleasesStep;

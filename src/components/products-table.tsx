import { FC, ReactNode } from 'react';
import Image from 'next/image';
import {
  DigitalProductsSearchResult,
  PhysicalProductsSearchResult,
} from '../pages/api/search-products';
import {
  getIGDBImageFromID,
  IGDB_IMAGE_RESOLUTIONS,
  IGDBImageType,
} from '../utils/igdb/igdb-frontend-utils';
import { timestampFormatDMY } from '../utils/timestamp-format';
import { FaGamepad } from 'react-icons/fa';

const ProductsTable: FC<{
  products: DigitalProductsSearchResult[] | PhysicalProductsSearchResult[];
  productsAreDigital: boolean;
  buttonContent: ReactNode;
  useCircularButton?: boolean;
  onClick: Function;
}> = ({
  products,
  productsAreDigital,
  buttonContent,
  useCircularButton,
  onClick,
}) => {
  return (
    <table className='table table-auto w-full'>
      <tbody>
        {products.map((product, index) => {
          let hasImage: boolean;
          let imageUrl: string;
          let dateText: string;
          let extraText: string;

          if (productsAreDigital) {
            const castedProduct = product as DigitalProductsSearchResult;
            hasImage = !!castedProduct.cover;
            imageUrl = hasImage
              ? getIGDBImageFromID(
                  castedProduct.cover!.image_id,
                  IGDBImageType.S_COVER
                )
              : '';
            dateText = castedProduct.first_release_date
              ? timestampFormatDMY(castedProduct.first_release_date * 1000)
              : 'Release Date Unknown';
            extraText = castedProduct.platforms
              ? castedProduct.platforms
                  .map(
                    (platform, index) =>
                      platform.name +
                      (index === castedProduct.platforms!.length - 1
                        ? ''
                        : ', ')
                  )
                  .join('')
              : 'Platform(s) Unknown';
          } else {
            const castedProduct = product as PhysicalProductsSearchResult;
            hasImage = !!castedProduct.image_url;
            imageUrl = hasImage ? castedProduct.image_url! : '';
            dateText = castedProduct.year_published
              ? 'First Released in ' + castedProduct.year_published.toString()
              : 'Release Date Unknown';
            extraText =
              castedProduct.primary_publisher?.name ?? 'Publisher Unknown';
          }

          return (
            <tr key={index}>
              <td>
                <div className={'flex flex-row items-center'}>
                  {hasImage ? (
                    <Image
                      src={imageUrl}
                      width={IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][0]}
                      height={IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][1]}
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
                          IGDB_IMAGE_RESOLUTIONS[IGDBImageType.S_COVER][0] - 30
                        }
                      />
                    </div>
                  )}

                  <div className={'flex flex-col flex-1 px-5'}>
                    <h4 className={'text-lg whitespace-normal'}>
                      {product.name}
                    </h4>
                    <p className={'text-base-content/50 whitespace-normal'}>
                      {dateText}
                      <br />
                      {extraText}
                    </p>
                  </div>

                  <button
                    className={
                      'btn btn-primary mr-2' +
                      (useCircularButton ? ' btn-circle' : '')
                    }
                    onClick={() => onClick(product)}
                  >
                    {buttonContent}
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductsTable;

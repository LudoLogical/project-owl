import { FC, ReactNode } from 'react';
import Image from 'next/image';
import { ProductsSearchResult } from '../pages/api/search-products';
import {
  getIGDBImageFromID,
  IGDB_IMAGE_RESOLUTIONS,
  IGDBImageType,
} from '../utils/igdb/igdb-frontend-utils';
import { timestampFormatDMY } from '../utils/timestamp-format';
import { FaGamepad } from 'react-icons/fa';

const ProductsTable: FC<{
  products: ProductsSearchResult[];
  buttonContent: ReactNode;
  useCircularButton?: boolean;
  onClick: Function;
}> = ({ products, buttonContent, useCircularButton, onClick }) => {
  return (
    <table className='table table-auto w-full'>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>
              <div className={'flex flex-row items-center'}>
                {product.cover ? (
                  <Image
                    src={getIGDBImageFromID(
                      product.cover.image_id,
                      IGDBImageType.S_COVER
                    )}
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
                    {product.first_release_date
                      ? timestampFormatDMY(product.first_release_date * 1000)
                      : 'Release Date Unknown'}
                    <br />
                    {product.platforms
                      ? product.platforms.map(
                          (platform, index) =>
                            platform.name +
                            (index === product.platforms.length - 1 ? '' : ', ')
                        )
                      : 'Platforms Unknown'}
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
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;

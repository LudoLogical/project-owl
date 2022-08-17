import { FC } from 'react';
import { FiBell } from 'react-icons/fi';

const NavBar: FC = ({}) => {
  return (
    <nav
      className={'navbar flex flex-row flex-nowrap justify-between bg-base-100'}
    >
      <h1 className={'text-xl font-bold ml-3'}>Project Owl</h1>
      <FiBell className={'mr-3'} />
    </nav>
  );
};

export default NavBar;

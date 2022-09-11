import type { NextPage } from 'next';
import { useTheme } from 'next-themes'

import s from './Registration.module.scss';

interface Props {

}

const Registration: NextPage = ({}: Props) => {
  const { theme, setTheme } = useTheme()

  return (
    <div>Registration component
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
};

export default Registration;

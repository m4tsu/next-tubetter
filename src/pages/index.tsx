import { User } from '@/store/users/model';
import { NotLoggedIn } from '@/components/pages/Top/NotLoggedIn/NotLoggedIn';

const Top = () => {
  const user: User | null = null;
  return <>{user ? <h2>loged In</h2> : <NotLoggedIn />}</>;
};

export default Top;

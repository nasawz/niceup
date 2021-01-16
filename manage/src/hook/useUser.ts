import { app } from '../lib/tcb';
import { config } from '../config';
import { useState } from 'react';
import axios from 'axios';
const auth = app.auth({ persistence: 'local' });

const getUser = () => {
  return auth.currentUser;
};

export function useUser() {
  const [user, setUser]: any = useState(getUser());
  const [loading, setLoading] = useState(false);
  const login = (username, password, cb) => {
    const ticketUrl = `https://${window['_tcbEnv'].TCB_SERVICE_DOMAIN}/auth`;
    setLoading(true);
    axios
      .post(ticketUrl, { username, password })
      .then(res => {
        const { ticket, adminNum } = res.data;
        if (!ticket) {
          cb(new Error(`用户名或密码错误`), null);
        } else {
          auth
            .customAuthProvider()
            .signIn(ticket)
            .then(res => {
              const user = auth.currentUser;
              user!.update({ nickName: username });
              user!.updateUsername(username);
              setUser(user);
              if (adminNum == 0) {
                axios.post(ticketUrl, { uid: user!.uid }).then(res => {
                  cb(null, user);
                });
              } else {
                cb(null, user);
              }
            })
            .catch(err => {
              cb(err, null);
            });
        }
      })
      .catch(err => {
        const res = err.response;
        if (res.status === 400) {
          cb(
            new Error(
              `${res.status}: ${res.statusText} 获取 Ticket 失败，用户 Id 不符合规则`,
            ),
            null,
          );
        }
        if (err.response.status === 429) {
          cb(
            new Error(
              `${res.status}: ${res.statusText} API rate limit exceeded`,
            ),
            null,
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const logout = () => {
    auth.signOut();
    setUser(null);
  };
  return {
    user,
    login,
    logout,
    loading,
  };
}

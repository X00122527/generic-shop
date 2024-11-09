import { useRef, useEffect } from 'react';
import ApiEndpoints from "../../api/apiEndpoints";
import ServerUrl from "../../api/serverUrl";
import AppPaths from '../../lib/appPaths'
import { useNavigate } from "react-router-dom";
import CookieUtil from "../../util/cookieUtil";



const GoogleSSO = () => {
  const g_sso = useRef(null);
  let navigate = useNavigate();


  useEffect(() => {
    if (g_sso.current) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (res, error) => {
          const formData = new FormData();
          formData.append('credential', res['credential']);
          formData.append('site', "google");
          const options = {
            method: 'POST',
            body: formData
          };
          const url = ServerUrl.BASE_URL + ApiEndpoints.GOOGLE_AUTH;
          fetch(url, options)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              Object.keys(data).forEach((key) => {
                CookieUtil.setCookie(key, data[key]);
            })
            })
            .catch(error => {
              console.error('Fetch error:', error);
            });
          navigate(AppPaths.SHOP, {replace: true});
          window.location.reload();

        },
      });
      google.accounts.id.renderButton(g_sso.current, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: '100%',
      });
    }
  }, [g_sso.current]);


  return (<div ref={g_sso} />);
}


export default GoogleSSO 
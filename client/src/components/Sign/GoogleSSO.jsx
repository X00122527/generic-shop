import { useRef, useEffect } from 'react';
import ApiEndpoints from "../../api/apiEndpoints";
import ServerUrl from "../../api/serverUrl";

const GoogleSSO = () => {

    const g_sso = useRef(null);

    useEffect(() => {
        if (g_sso.current) {
            google.accounts.id.initialize({
                client_id: "939780826507-q2k2o2pqm48ie33bsncb1ag6judrord2.apps.googleusercontent.com",
                callback: (res, error) => {
                    console.log('pushing: ',JSON.stringify(res));
                    const options = {
                        method: 'POST',
                        headers: {
                          Accept: "application/json, text/plain",
                          "Content-Type": "application/json; charset=UTF-8",
                        },
                        body: res //JSON.stringify(res)
                      };
                      const url = ServerUrl.BASE_URL + ApiEndpoints.GOOGLE_AUTH;
                      let successLoginData;
                      fetch(url, options)
                        .then(response => {
                          if (!response.ok) {
                            throw new Error('Network response was not ok');
                          }
                          return response.json();
                        })
                        .then(data => {
                          console.log(data);
                        })
                        .catch(error => {
                          console.error('Fetch error:', error);
                        });
                    // This is the function that will be executed once the authentication with google is finished
                },
            });
            google.accounts.id.renderButton(g_sso.current, {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left',
                width: '220',
            });
        }
    }, [g_sso.current]);


    return (<div ref={g_sso} />);
}


export default GoogleSSO 
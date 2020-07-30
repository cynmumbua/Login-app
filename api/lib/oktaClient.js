import okta from  '@okta/okta-sdk-nodejs';

const client = new okta.Client({
  orgUrl: 'https://dev-126962.okta.com',
  token: '00TcQp2EL5aWSZak8muJ1Rwrb7o4_KIQnhgbGNWsIc'
});

export default client;
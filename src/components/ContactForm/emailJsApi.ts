import {init, send} from 'emailjs-com';

export const sendMessage = (data, onSuccess, onError) => {
  const config = {
    userID: 'rtDaXEca73jnwHg5z',
    serviceID: 'service_wcq0suf',
    templateID: 'template_9gkt6as',
  };
  init(config.userID);
  send(
      config.serviceID,
      config.templateID,
      data,
  )
      .then((response) => {
        onSuccess('Успешно отправлено', response.status, response.text);
      })
      .catch((err) => {
        onError('Что-то пошло не так...', err);
      });
};

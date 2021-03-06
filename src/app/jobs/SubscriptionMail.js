import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: 'Nova inscrição no meetup',
      template: 'subscription',
      context: {
        speaker: meetup.user.name,
        registered: user.name,
        meetup: meetup.title,
        date: format(parseISO(meetup.date), "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new SubscriptionMail();

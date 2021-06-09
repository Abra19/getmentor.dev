import Head from 'next/head'
import Link from 'next/link'
import NavHeader from '../components/NavHeader'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import { getMentors } from '../lib/mentors'

export async function getServerSideProps() {
  const mentors = await getMentors()

  return {
    props: {
      mentors,
    }
  }
}

export function Mentors(props) {
  const { mentors } = props

  const filters = {
    tags: [
      'All',
      'Backend',
      'Frontend',
      'Code Review',
      'System Design',
      'UX/UI/Design',
      'iOS',
      'Android',
      'QA',
      'Marketing',
      'Content/Copy',
      'Databases',
      'Data Science/ML',
      'Аналитика',
      'Network',
      'Cloud',
      'DevOps/SRE',
      'Agile',
      'Team Lead/Management',
      'Project Management',
      'Product Management',
      'Entrepreneurship',
      'DevRel',
      'HR',
      'Карьера',
      'Собеседования',
      'Другое',
    ],
    price: [
      '✅ Бесплатно',
      '1000 руб',
      '2000 руб',
      '3000 руб',
      '4000 руб',
      '5000 руб',
      '6000 руб',
      '7000 руб',
      '8000 руб',
      '9000 руб',
      '🤝 По договоренности',
    ],
    experience: [
      '<2 лет',
      '😎 2-5 лет',
      '😎 5-10 лет',
      '🌟 10+ лет',
    ],
  }

  return (
    <section className="section" data-section="list">
      <a name="list"></a>

      <div className="container">
        <h2 className="section__title text-center">Наши менторы</h2>

        <div className="section__content">
          <div>
            <div className="text-center">
              <ul className="filters list-unstyled list-inline">
                {filters.tags.map(tag => (
                  <li className="filter__item" key={tag}>{tag}</li>
                ))}
              </ul>

              <ul className="filters list-unstyled list-inline">
                {filters.price.map(price => (
                  <li className="filter__item" key={price}>{price}</li>
                ))}
              </ul>

              <ul className="filters list-unstyled list-inline">
                {filters.experience.map(experience => (
                  <li className="filter__item" key={experience}>{experience}</li>
                ))}
              </ul>
            </div>

            <div className="loading__overlay" style={{ display: 'none' }}></div>
            <div className="cards__wrapper per-row--4">
              {mentors.map(mentor => (
                <div className="card card__image-only has_hover" key={mentor.id}>
                  <div className="card__inner">
                    <div
                      className="card__header"
                      style={{ backgroundImage: 'url(' + mentor.photo.thumbnails.large.url + ')' }}
                    >
                      <div className="card__extras">
                        <div>{mentor.experience}</div>
                        <div>{'✅ ' + mentor.menteeCount}</div>
                        <div>{mentor.price}</div>
                        <div>➡️</div>
                      </div>
                      <div className="card__content">
                        <h4 className="card__title">{mentor.name}</h4>
                        <p className="card__description">{mentor.job}</p>
                      </div>
                      <div className="card__header_overlay" style={{ background: 'rgba(0,0,0,0.3)' }}></div>
                    </div>

                    <Link href={'/mentors/' + mentor.id}>
                      <a className="card__link"></a>
                    </Link>

                    <div id={'popup_' + mentor.id} className="lity-popup lity-hide">
                      <h3>{mentor.name}</h3>
                      <p><b><em>{mentor.job}</em></b></p>
                      <p>{mentor.description}</p>
                      <p>
                        <Link
                          href={'/mentors/' + mentor.id}
                          target="_blank"
                          rel="noreferrer"
                        >{'/mentors/' + mentor.id}</Link>
                      </p>

                      <p className="text-center">
                        <a
                          className="button"
                          href="https://airtable.com/shr5aTzZF5zKSRUDG?prefill_Mentor=recGuJKR7nuAy7STG"
                          target="_blank"
                          rel="noreferrer"
                        >Оставить заявку</a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="more" style={{ display: 'none' }}>
              <a className="button btn__load_more" href="#">Посмотреть ещё</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home(props) {
  const { mentors } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>GetMentor – открытое сообщество IT-наставников</title>
        <meta
          name="description"
          content="GetMentor – это открытое комьюнити IT-наставников, готовых делиться своими опытом и знаниями. Наша задача – помогать людям находить ответы на свои вопросы в работе или жизни через прямой доступ к экспертизе в разговоре 1-на-1."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavHeader />

      <section className="banner banner--default" data-section="header">
        <div className="container">
          <div className="banner__inner">
            <div className="row">
              <div className="column banner__content">
                <h1>Найди своего ментора</h1>
                <p>GetMentor&nbsp;— это открытое сообщество IT-наставников, готовых
                  делиться своими знаниями и опытом.<br />
                  Наша задача&nbsp;— помогать людям находить ответы на свои вопросы в работе или
                  жизни через прямой
                  доступ к экспертизе в разговоре 1-на-1.
                </p>
                <div className="banner__cta">
                  <a className="button" target="_self" href="#list">Найти ментора</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-section="howitworks">
        <a name="howitworks"></a>

        <div className="container">
          <h2 className="section__title text-center"><span style={{ color: '#FF6A3D' }}>Как это работает</span>
          </h2>
          <div className="section__content">
            <div className="features__wrapper features--3">
              <div className="icon_box style--icon_left" style={{ width: '33.33%' }}>
                <div className="icon_box__icon">
                  <i className=" size--large fas fab fa-fas fa-id-badge"
                    style={{ color: '#FF6A3D' }}></i>
                </div>

                <div className="icon_box__content">
                  <h4 className="icon_box__title">Ты выбираешь наставника из списка ниже</h4>
                  <p className="icon_box__text">Все наши менторы выбраны вручную, чтобы исключить
                    шарлатанство
                    и спам.
                  </p>
                </div>
              </div>

              <div className="icon_box style--icon_left" style={{ width: '33.33%' }}>
                <div className="icon_box__icon">
                  <i className=" size--large fas fab fa-fas fa-info" style={{ color: '#FF6A3D' }}></i>
                </div>

                <div className="icon_box__content">
                  <h4 className="icon_box__title">У каждого ментора есть подробное описание, с чем
                    он может
                    помочь</h4>
                  <p className="icon_box__text">Его легко посмотреть, нажав на фотку профиля, будет
                    много
                    текста и кнопка для записи. А ещё есть пометки опыта: 🌟10+ лет, 😎5-10 лет,
                    👍2-5 лет. И цена за
                    сессию.
                  </p>
                </div>
              </div>

              <div className="icon_box style--icon_left" style={{ width: '33.33%' }}>
                <div className="icon_box__icon">
                  <i className=" size--large fas fab fa-fas fa-edit" style={{ color: '#FF6A3D' }}></i>
                </div>

                <div className="icon_box__content">
                  <h4 className="icon_box__title">Когда выбрал, оставляй заявку</h4>
                  <p className="icon_box__text">
                    Напиши подробно, какую помощь ищешь, чтобы ментор лучше понимал, как тебе
                    помочь.
                  </p>
                </div>
              </div>

              <div className="icon_box style--icon_left" style={{ width: '33.33%' }}>
                <div className="icon_box__icon">
                  <i className=" size--large fas fab fa-fas fa-paper-plane"
                    style={{ color: '#FF6A3D' }}></i>
                </div>

                <div className="icon_box__content">
                  <h4 className="icon_box__title">Мы передадим твою информацию ментору</h4>
                  <p className="icon_box__text">Почти мгновенно, как только отработает
                    автоматизация.</p>
                </div>
              </div>

              <div className="icon_box style--icon_left" style={{ width: '33.33%' }}>

                <div className="icon_box__icon">
                  <i className=" size--large fas fab fa-fas fa-comments"
                    style={{ color: '#FF6A3D' }}></i>
                </div>

                <div className="icon_box__content">
                  <h4 className="icon_box__title">Ментор напишет тебе и обсудит все детали</h4>
                  <p className="icon_box__text">
                    Напрямую без посредников. Тут мы уже выходим из игры и
                    оставляем вас наедине. Стоимость и способ оплаты — также на усмотрение ментора.
                  </p>
                </div>
              </div>

              <div className="icon_box style--icon_left" style={{ width: '33.33%' }}>
                <div className="icon_box__icon">
                  <i className=" size--large fas fab fa-fas fa-search"
                    style={{ color: '#FF6A3D' }}></i>
                </div>

                <div className="icon_box__content">
                  <h4 className="icon_box__title">Не нашли, кого искали?</h4>
                  <p className="icon_box__text">
                    Оставь заявку на подбор ментора и наши специалисты вручную найдут наставника под
                    твой запрос.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-section="support">
        <a name="support"></a>
        <div className="container">
          <h2 className="section__title text-center">Поддержать проект</h2>
          <div className="text-center section__description">
            <p>
              <a
                href="https://www.patreon.com/getmentor"
                target="_blank"
                rel="noreferrer"
                style={{ borderBottom: 'none' }}
              >
                <img
                  src="https://dl.airtable.com/.attachments/459c122afbca675d1172b0a198c176ab/d7bfca46/Digital-Patreon-Wordmark_FieryCoral.png"
                  width="200px"
                  style={{ paddingRight: '20px' }}
                />
              </a>

              <a
                href="https://www.tinkoff.ru/rm/mogelashvili.georgiy1/llaLa45003"
                target="_blank"
                rel="noreferrer"
                style={{ borderBottom: 'none' }}
              >
                <img
                  src="https://dl.airtable.com/.attachments/39cd6946259ab35a8d8f8ecec995c325/f523c45c/tinkoff.png"
                  width="200px"
                  style={{ paddingRight: '20px' }}
                />
              </a>

              <a
                href="https://paypal.me/glamcoder"
                target="_blank"
                rel="noreferrer"
                style={{ borderBottom: 'none' }}
              >
                <img
                  src="https://dl.airtable.com/.attachments/d671166bc047b43a9d897b5cbda5c336/fa2e91fe/paypal.png"
                  width="200px"
                />
              </a>
            </p>
          </div>
        </div>
      </section>

      <Mentors mentors={mentors} />

      <section className="section" data-section="sponsors">
        <a name="sponsors"></a>

        <div className="container">
          <h2 className="section__title text-center">Нас поддерживают</h2>
          <div className="text-center section__description">
            <p>
              <a
                href="https://avito.tech"
                target="_blank"
                rel="noreferrer"
                style={{ borderBottom: 'none' }}
              >
                <img
                  src="https://dl.airtable.com/.attachments/19f21846f5925e28a11e9447b286223c/db62e445/v2.png"
                  width="300px"
                  style={{ paddingRight: '20px' }}
                />
              </a>

              <br />
              <br />

              <a
                href="https://www.notion.so/GetMentor-dev-1c6b882718154fc0961be132cab354a4"
                target="_blank"
                rel="noreferrer"
              >
                Стать нашим спонсором
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="section" data-section="donate">
        <a name="donate"></a>
        <div className="container">
          <h2 className="section__title text-center">🍩 Донат</h2>
          <div className="text-center section__description">
            <p>Поиск наставника&nbsp;— сложный процесс. Как минимум потому, что не понятно, а где же
              его надо искать. Абсолютно такой же сложный процесс&nbsp;— поиск учеников, если ты
              эксперт. Этот сайт был задуман как место, где люди, которым нужна помощь ментора, и
              специалисты, готовые делиться знаниями, могли найти друг друга.
            </p>

            <p>Наша главная задача&nbsp;— соединять людей и развивать коммьюнити за счёт новых
              знакомств и передачи знаний.<br/>
            <strong style={{ color: '#FF6A3D' }}>За свою работу мы не берём никакой комиссии, оплаты за
                участие и прочих обязательных взносов и вознаграждений ни от менторов, ни от
                менти.</strong><br/>
              Мы верим в то, что если эта площадка приносит пользу людям, то они сами захотят
              отблагодарить нас за это.
            </p>

            <p>Поэтому у тебя есть возможность задонатить нам сколько ты хочешь. Сделать это
              довольно легко, вот <Link href="/donate">тут написано как</Link>.
            </p>
          </div>

          <div className="section__content">
            <div className="text-center element-center">
              <div className="section__cta">
                <Link className="button" href="/donate">Поблагодарить</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-section="addyourown">
        <a name="addyourown"></a>
        <div className="container">
          <h2 className="section__title text-center">Стать ментором</h2>
          <div className="text-center section__description">
            <p>У тебя есть опыт и ты хочешь делиться своими знаниями и помогать другим? <strong>Присоединяйся
              к нашей команде менторов!</strong>
            </p>
            <p>Заполни анкету и мы обязательно добавим тебя на сайт.</p>
          </div>

          <div className="section__content">
            <div className="text-center element-center">
              <div className="section__cta">
                <Link className="button" href="/bementor">Оставить заявку</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-section="faq">
        <a name="faq"></a>
        <div className="container">
          <h2 className="section__title text-center">FAQ</h2>
          <div className="section__description">
            <h4>❓&nbsp;Зачем всё это?</h4>
            <p>Мы видим огромную потребность у современных специалистов в
              наставниках, которые помогали бы им преодолевать трудности и научили бы тонкостям и
              тайным знаниям. Этот сервис&nbsp;— попытка построить коммьюнити наставников и
              учеников, чтобы облегчить им поиск друг друга.
            </p>

            <h4>📅&nbsp;Я записался к ментору. Что теперь?</h4>
            <p>Отлично! Сразу после того, как ты оставил заявку на
              менторство, мы передаём её выбранному эксперту. Он или она рассмотрят её в течение
              пары дней. Если ментор решит, что готов помочь по этой заявке, то он сам свяжется с
              тобой для выбора времени и способа встречи.
            </p>
            <p>Однако может случиться такое, что ментор решит отказаться
              от заявки. Это не значит, что ты сделал что-то не так, просто у ментора может не быть
              времени или необходимой экспертизы. В этом случае мы обязательно оповестим тебя об
              отказе, чтобы ты мог найти себе другого специалиста.
            </p>

            <h4>💶&nbsp;Сколько это стоит?</h4>
            <p>Мы хотим построить сообщество, поэтому не хотим приплетать в
              процесс деньги. Однако мы понимаем, что время эксперта может чего-то стоить. Поэтому у
              нас каждый ментор сам назначает стоимость своей консультации, которую мы затем
              показываем на карточке. Эта цена носит рекомендательный характер и всегда обсуждается
              с экспертом напрямую.
            </p>
            <p>При этом наша площадка абсолютно ничего не берёт себе из
              этой цены. Если вы хотите поддержать проект и отблагодарить нас за работу, вы можете
            <Link href="/donate">сделать нам донат</Link>.
            </p>

            <h4>🚫&nbsp;Я не нашёл ментора. Что делать?</h4>
            <p>Так бывает, но не нужно расстраиваться. Ты можешь поделиться
              ссылкой на этот сайт в своих сетях, чтобы больше людей узнало о площадке и пришло сюда
              в качестве экспертов.
            </p>

            <h4>🙋‍♀️&nbsp;Как мне стать ментором?</h4>
            <p>Очень просто. Достаточно <Link href="/bementor">оставить заявку</Link>, и мы обязательно вас
              добавим.
            </p>

            <h4>👋&nbsp;У меня есть идеи. Куда писать?</h4>
            <p>Пишите <a href="mailto:hello@getmentor.dev">нам на почту</a>,
              мы с радостью почитаем и ответим.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

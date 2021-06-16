import Head from 'next/head'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge, faInfo, faPaperPlane, faComments, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'
import { getMentors } from '../server/cached-mentors'
import NavHeader from '../components/NavHeader'
import Footer from '../components/Footer'
import MentorsFilters from '../components/MentorsFilters'
import MentorsList from '../components/MentorsList'
import MentorsSearch from '../components/MentorsSearch'
import Section from '../components/Section'
import useMentors from '../components/useMentors'
import seo from '../config/seo'
import donates from '../config/donates'

export async function getServerSideProps() {
  const allMentors = await getMentors()

  const pageMentors = allMentors
    .filter(mentor => mentor.isVisible)

  return {
    props: {
      pageMentors,
    },
  }
}

function Feature(props) {
  return (
    <div className="flex sm:w-1/2 lg:w-1/3 p-4">
      <div className="pr-4">
        <FontAwesomeIcon
          className="text-primary"
          icon={props.icon}
          size="2x"
          fixedWidth
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">{props.title}</h3>
        <div>{props.text}</div>
        <br/>
        <div>{props.subline}</div>
      </div>
    </div>
  )
}

export default function Home({ pageMentors }) {
  const [
    mentors,
    searchInput,
    selectedTags,
    hasMoreMentors,
    setSearchInput,
    setSelectedTags,
    showMoreMentors,
  ] = useMentors(pageMentors)

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image.src" content={seo.imageUrl} />

        <meta name="og:site_name" content={seo.title} />
        <meta name="og:type" content="website" />
        <meta name="og:description" content={seo.description} />
        <meta name="og:image" content={seo.imageUrl} />
      </Head>

      <NavHeader />

      <Section className="bg-primary-100" id="header">
        <div className="text-center py-14 lg:w-3/4 mx-auto">
          <h1>Найди своего ментора</h1>

          <p>GetMentor&nbsp;— это открытое сообщество IT-наставников, готовых делиться знаниями и опытом.<br /><br />
            Правильный разговор прояснит ситуацию лучше, чем десять часов поисков в интернете. 
            Поэтому мы помогаем тем, кому нужен совет, найти человека с экспертизой и обсудить свой вопрос один на один.
          </p>

          <a className="button bg-primary-900 mt-6" href="#list">Найти ментора</a>
        </div>
      </Section>

      <Section id="howitworks">
        <Section.Title className="text-primary">Как это работает</Section.Title>

        <div className="flex flex-wrap">
          <Feature
            icon={faIdBadge}
            title="Выбери ментора"
            text="С нами работают 250+ специалистов из Авито, Яндекса, Google и других компаний. Можешь выбрать нужного человека по специальности, опыту работы и стоимости встречи."
            subline="Всех менторов мы проверяем сами: никакого шарлатанства."
          />

          <Feature
            icon={faEdit}
            title="Напиши ему"
            text="Оставь заявку на сайте. Напиши, с чем тебе нужна помощь и что бы ты хотел получить."
            subline="Помни: хорошо сформулированная проблема — наполовину решённая проблема. Чем подробнее опишешь, тем лучше."
          />

          <Feature
            icon={faComments}
            title="Дело за вами"
            text="Мы перешлём твою заявку ментору. Он оценит задачу и свяжется с тобой, чтобы обсудить детали и выбрать время. Каждый ментор сам определяет стоимость и длительность сессии."
            subline="Тут мы не вмешиваемся — дело за вами."
          />
        </div>
      </Section>

      <Section className="bg-gray-100" id="support">
        <Section.Title>Поддержать проект</Section.Title>

        <div className="flex flex-wrap justify-center items-center">
          {donates.map(donate => (
            <a
              key={donate.name}
              className="border-0 h-20 px-8 flex justify-center items-center"
              href={donate.linkUrl}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={donate.logoImageUrl}
                width="200px"
              />
            </a>
          ))}
        </div>
        <div className="text-center mt-4">
          <a
            href="donate"
            target="_blank"
          >
            Почему это важно
          </a>
        </div>
      </Section>

      <Section id="list">
        <Section.Title>Наши менторы</Section.Title>

        <div className="mb-6">
          <MentorsSearch
            value={searchInput}
            onChange={setSearchInput}
          />
        </div>

        <div className="mb-8">
          <MentorsFilters
            tags={selectedTags}
            onChange={setSelectedTags}
          />
        </div>

        <MentorsList
          mentors={mentors}
          hasMore={hasMoreMentors}
          onClickMore={() => showMoreMentors()}
        />
      </Section>

      <Section className="bg-gray-100" id="sponsors">
        <Section.Title>Нас поддерживают</Section.Title>

        <div className="flex justify-center items-center">
          <a
            className="border-0 px-4"
            href="https://avito.tech"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://dl.airtable.com/.attachments/19f21846f5925e28a11e9447b286223c/db62e445/v2.png"
              width="300px"
            />
          </a>

          <a
            className="border-0 px-4"
            href="ontico"
          >
            <img
              src="https://dl.airtable.com/.attachments/48ab3a9ca08a92d944fed05cf70362f0/a1ae68e0/ontico_logo_300px.png"
              width="300px"
            />
          </a>
        </div>


        <div className="text-center mt-4">
          <a
            href="https://www.notion.so/GetMentor-dev-1c6b882718154fc0961be132cab354a4"
            target="_blank"
            rel="noreferrer"
          >
            Стать нашим спонсором
          </a>
        </div>
      </Section>

      <Section id="donate">
        <Section.Title>🍩 Донат</Section.Title>

        <div className="text-center">
          <p>Поиск наставника&nbsp;— сложный процесс. Как минимум потому, что не понятно, а где же
            его надо искать. Абсолютно такой же сложный процесс&nbsp;— поиск учеников, если ты
            эксперт. Этот сайт был задуман как место, где люди, которым нужна помощь ментора, и
            специалисты, готовые делиться знаниями, могли найти друг друга.
          </p>

          <p>Наша главная задача&nbsp;— соединять людей и развивать комьюнити за счёт новых
            знакомств и передачи знаний.<br/>
          <strong className="text-primary">За свою работу мы не берём никакой комиссии, оплаты за
              участие и прочих обязательных взносов и вознаграждений ни от менторов, ни от
              менти.</strong><br/>
            Мы верим в то, что если эта площадка приносит пользу людям, то они сами захотят
            отблагодарить нас за это.
          </p>

          <p>Поэтому у тебя есть возможность задонатить нам сколько ты хочешь. Сделать это
            довольно легко, вот <Link href="/donate">тут написано как</Link>.
          </p>

          <Link href="/donate">
            <a className="button bg-primary-900">Поблагодарить</a>
          </Link>
        </div>
      </Section>

      <Section className="bg-gray-100" id="addyourown">
        <Section.Title>Стать ментором</Section.Title>

        <div className="text-center">
          <p>У тебя есть опыт и ты хочешь делиться своими знаниями и помогать другим?
            {' '}
            <strong>Присоединяйся к нашей команде менторов!</strong>
          </p>

          <p>Заполни анкету и мы обязательно добавим тебя на сайт.</p>

          <Link href="/bementor">
            <a className="button bg-primary-900">Оставить заявку</a>
          </Link>
        </div>
      </Section>

      <Section id="faq">
        <Section.Title>FAQ</Section.Title>

        <h4 className="text-xl font-semibold mt-10">❓&nbsp;Зачем всё это?</h4>
        <p>Мы видим огромную потребность у современных специалистов в
          наставниках, которые помогали бы им преодолевать трудности и научили бы тонкостям и
          тайным знаниям. Этот сервис&nbsp;— попытка построить комьюнити наставников и
          учеников, чтобы облегчить им поиск друг друга.
        </p>

        <h4 className="text-xl font-semibold mt-10">📅&nbsp;Я записался к ментору. Что теперь?</h4>
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

        <h4 className="text-xl font-semibold mt-10">💶&nbsp;Сколько это стоит?</h4>
        <p>Мы хотим построить сообщество, поэтому не хотим приплетать в
          процесс деньги. Однако мы понимаем, что время эксперта может чего-то стоить. Поэтому у
          нас каждый ментор сам назначает стоимость своей консультации, которую мы затем
          показываем на карточке. Эта цена носит рекомендательный характер и всегда обсуждается
          с экспертом напрямую.
        </p>
        <p>При этом наша площадка абсолютно ничего не берёт себе из
          этой цены. Если вы хотите поддержать проект и отблагодарить нас за работу, вы
          можете <Link href="/donate">сделать нам донат</Link>.
        </p>

        <h4 className="text-xl font-semibold mt-10">🚫&nbsp;Я не нашёл ментора. Что делать?</h4>
        <p>Так бывает, но не нужно расстраиваться. Ты можешь поделиться
          ссылкой на этот сайт в своих сетях, чтобы больше людей узнало о площадке и пришло сюда
          в качестве экспертов.
        </p>

        <h4 className="text-xl font-semibold mt-10">🙋‍♀️&nbsp;Как мне стать ментором?</h4>
        <p>Очень просто. Достаточно <Link href="/bementor">оставить заявку</Link>, и мы обязательно вас
          добавим.
        </p>

        <h4 className="text-xl font-semibold mt-10">👋&nbsp;У меня есть идеи. Куда писать?</h4>
        <p>Пишите <a href="mailto:hello@getmentor.dev">нам на почту</a>,
          мы с радостью почитаем и ответим.
        </p>
      </Section>

      <Footer />
    </>
  )
}

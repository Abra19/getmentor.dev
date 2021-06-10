import Head from 'next/head'
import NavHeader from '../components/NavHeader'
import Footer from '../components/Footer'
import Section from '../components/Section'

export default function Privacy() {
  return (
    <div>
      <Head>
        <title>Политика в отношении обработки персональных данных | GetMentor – открытое сообщество IT-наставников</title>
      </Head>

      <NavHeader />

      <Section className="bg-primary-100" id="header">
        <div className="text-center py-14 lg:w-3/4 mx-auto">
          <h1>Политика в отношении обработки персональных данных</h1>
        </div>
      </Section>

      <div className="iframe-wrapper">
        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vQ7TZDFd34wmte5fT02otFAariW18d5uLIR0LsOa9MyPNw6c_CkKEMrzuKlhlFHblcCov9C8XkEqBip/pub?embedded=true"
          style={{
            display: 'block',
            border: 'none',
            margin: '0 auto',
            width: '100%',
            height: '600px',
          }}>
        </iframe>
      </div>

      <Footer />
    </div>
  )
}

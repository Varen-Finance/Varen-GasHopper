import Container from 'app/components/Container'
import DoubleGlowShadow from 'app/components/DoubleGlowShadow'
import Row from 'app/components/Row'
import { classNames } from 'app/functions'

export default function Home() {
  return (
    <Container id="home-page" className="py-4 md:py-8 lg:py-10 lg:px-6">
      <DoubleGlowShadow>
        <Row justify="space-between">
          <div
            className={classNames(
              'w-full p-4 border rounded bg-varen-darkest-blue border-varen-blue',
              'md:w-2/5 md:mr-2'
            )}
          ></div>
          <div className={classNames('w-full p-4', 'md:w-1/5')}></div>
          <div
            className={classNames(
              'w-full p-4 border rounded bg-varen-darkest-blue border-varen-blue',
              'md:w-2/5 md:ml-2'
            )}
          ></div>
        </Row>
      </DoubleGlowShadow>
    </Container>
  )
}

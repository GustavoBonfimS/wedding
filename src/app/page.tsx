import { MapPin } from 'lucide-react';
import { Suspense } from 'react';
import Countdown from '~/components/countdown';
import FadeDiv from '~/components/fade-div';
import Header from '~/components/header';
import MainLogo from '~/components/main-logo';
import SectionContent from '~/components/section-content';
import SectionTitle from '~/components/section-title';
import { Button } from '~/components/ui/button';
import PresenceForm from './presence-form';

function Home() {
  return (
    <>
      <FadeDiv>
        <Header />
      </FadeDiv>
      <div className="flex flex-col items-center gap-12 md:gap-16 pb-12">
        <FadeDiv className="flex w-full flex-col items-center justify-center">
          <MainLogo />

          <SectionTitle>07/06/2025</SectionTitle>
          <span className="mt-2 mb-10 text-gold text-xl italic">
            Save the date
          </span>

          <Countdown />
        </FadeDiv>

        <SectionContent>
          <span>Olá queridos amigos e familiares,</span>
          <p>
            É com grande alegria que estamos nos preparando para o nosso grande
            dia, o nosso casamento! Gostaríamos de expressar o quanto significa
            para nós tê-los presentes nesse momento especial de nossas vidas.
          </p>
        </SectionContent>

        <SectionContent>
          <SectionTitle id="presentes">Lista de presentes</SectionTitle>

          <p>
            Mais do que qualquer presente material, o que realmente valorizamos
            é ter vocês ao nosso lado enquanto embarcamos nesta nova fase de
            nossas vidas.
          </p>
          <p>
            Se você gostaria de nos presentear, por favor, sinta-se à vontade
            para explorar nossa lista de presentes através do link fornecido
            abaixo.
          </p>
          <Button variant="outline" type="button" className="mx-auto mt-8 flex">
            <a
              href="https://lista.havan.com.br/Convidado/ItensListaPresente/734798"
              target="_blank"
              rel="noreferrer"
            >
              Ver lista de presentes
            </a>
          </Button>
        </SectionContent>

        <SectionContent id="presence">
          <SectionTitle>Confirmar presença</SectionTitle>

          <Suspense>
            <PresenceForm />
          </Suspense>
        </SectionContent>

        <SectionContent>
          <SectionTitle id="location">Como chegar:</SectionTitle>

          <div className="flex flex-col items-center justify-evenly gap-4 lg:flex-row">
            <div className="flex flex-col items-center gap-6 text-center">
              <MapPin />
              <div>
                <span className="font-semibold">Chácara Lighting Decor</span>
                <br />
                Chiquinha Gonzaga, 246 <br />
                Chácaras Califórnia, <br />
                Araçatuba - SP <br />
              </div>
              <Button className="flex gap-2 lg:hidden" type="button" asChild>
                <a
                  href="https://maps.app.goo.gl/dSJ4BSPfgoqzbWYJA"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir no mapa <MapPin size={20} />
                </a>
              </Button>
            </div>
            <iframe
              title="location map"
              className="hidden h-56 w-1/2 rounded-md border border-wedding lg:flex"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.371590288143!2d-50.480062525810446!3d-21.217108579674612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94964370ac46c477%3A0xb510cb82c579579!2sChacara%20Lighting%20Decor!5e0!3m2!1spt-BR!2sbr!4v1709042664315!5m2!1spt-BR!2sbr"
            />
          </div>
        </SectionContent>
      </div>
    </>
  );
}

export default Home;

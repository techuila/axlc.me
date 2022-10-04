import {
  GradientText,
  HeroAvatar,
  HeroSocial,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>Axl</GradientText> 👋
        </>
      }
      description={
        <>
          A Full Stack Web Developer with a problem-solving mindset <br />
          and self-motivation. My core expertise lies in{' '}
          <a
            className="text-cyan-400 hover:underline"
            href="https://reactjs.org/"
          >
            ReactJS
          </a>{' '}
          ,{' '}
          <a
            className="text-cyan-400 hover:underline"
            href="https://nodejs.org/en/"
          >
            NodeJS
          </a>
          ,{' '}
          <a
            className="text-cyan-400 hover:underline"
            href="https://graphql.org/"
          >
            Graphql
          </a>
          ,{' and '}
          DevOps . I'm also interested to learn new ideas on UI/UX design <br />
          to improve user's productivity and satisfaction. <br />
          <br />I strive to build great web solutions to ensure satisfaction{' '}
          <br />
          with the cost-effective product that clients get. <br />I would be
          glad to have an opportunity to bring my knowledge and implementation
          of my skills in designing essentials and services with you.
        </>
      }
      avatar={
        <img
          className="h-80 w-64"
          src="/assets/images/avatar.svg"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="https://web.facebook.com/0l00000l" target="_blank">
            <HeroSocial
              src="/assets/images/facebook-icon.png"
              alt="Facebook icon"
            />
          </a>
          <a href="https://www.linkedin.com/in/axlcuyugan/" target="_blank">
            <HeroSocial
              src="/assets/images/linkedin-icon.png"
              alt="Linkedin icon"
            />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };

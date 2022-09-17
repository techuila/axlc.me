import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <>
        Recent <GradientText>Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-6">
      <Project
        name="Aliteo SMS"
        description="An SMS API Service provides services that make it simple for users to send and receive SMS anywhere in the Philippines."
        link="/"
        img={{
          src: '/assets/images/github.svg',
          alt: 'Project Web Design',
        }}
        category={
          <>
            <Tags color={ColorTags.GREEN}>In Progress</Tags>
            <Tags color={ColorTags.FUCHSIA}>Web/Mobile App</Tags>
            <Tags color={ColorTags.SKY}>Flutter</Tags>
            <Tags color={ColorTags.SKY}>ReactJs</Tags>
            <Tags color={ColorTags.SKY}>TypeScript</Tags>
            <Tags color={ColorTags.LIME}>NodeJs</Tags>
            <Tags color={ColorTags.ROSE}>NestJs</Tags>
            <Tags color={ColorTags.ORANGE}>RabbitMQ</Tags>
          </>
        }
      />
      <Project
        name="Aliteo"
        description="Aliteo is a platform to help professionals and businesses in Zamboanga City to let it be known to customers and grow their businesses."
        link="/"
        img={{
          src: '/assets/images/github.svg',
          alt: 'Project Web Design',
        }}
        category={
          <>
            <Tags color={ColorTags.GREEN}>In Progress</Tags>
            <Tags color={ColorTags.FUCHSIA}>Web/Mobile App</Tags>
            <Tags color={ColorTags.SKY}>Flutter</Tags>
            <Tags color={ColorTags.SKY}>ReactJs</Tags>
            <Tags color={ColorTags.SKY}>TypeScript</Tags>
            <Tags color={ColorTags.LIME}>NodeJs</Tags>
            <Tags color={ColorTags.ROSE}>NestJs</Tags>
            <Tags color={ColorTags.ORANGE}>RabbitMQ</Tags>
          </>
        }
      />
      <Project
        name="Image Classification App"
        description="This is an application that can be used by Hemodialysis Patients,
        the vegetables that the application can only recognize are the vegetables that are only can be
        found around in Zamboanga City and thus help hemodialysis patients with their Vegetable Dietary Restriction."
        link="https://github.com/techuila/Image-Classification-App"
        img={{ src: '/assets/images/github.svg', alt: 'Github' }}
        category={
          <>
            <Tags color={ColorTags.YELLOW}>Mobile App</Tags>
            <Tags color={ColorTags.ROSE}>Java</Tags>
            <Tags color={ColorTags.SKY}>Python</Tags>
          </>
        }
      />
    </div>
  </Section>
);

export { ProjectList };

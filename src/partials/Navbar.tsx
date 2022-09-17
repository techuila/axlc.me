import {
  Logo,
  NavbarTwoColumns,
  NavMenu,
  NavMenuItem,
  Section,
} from 'astro-boilerplate-components';

const Navbar = () => (
  <Section>
    <NavbarTwoColumns>
      <a href="/">
        <Logo
          icon={<img src="/assets/images/icon.png" height={60} width={60} />}
          name=""
        />
      </a>

      <NavMenu>
        <NavMenuItem href="https://github.com/techuila">GitHub</NavMenuItem>
        <NavMenuItem href="https://ph.linkedin.com/in/axlcuyugan">
          LinkedIn
        </NavMenuItem>
      </NavMenu>
    </NavbarTwoColumns>
  </Section>
);

export { Navbar };

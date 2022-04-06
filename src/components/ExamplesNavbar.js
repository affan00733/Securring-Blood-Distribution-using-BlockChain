import React from "react";
import { Link, useHistory } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function ExamplesNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const urlname = props.urlname;
  const history = useHistory();

  const logout = () => {
    history.push("/");
  };

  const getrefreshurl = () => {
    if (urlname === "landing" || urlname === "login") {
      return "/";
    } else if (urlname === "bbhome") {
      return "bloodbankhome";
    } else if (urlname === "hhome") {
      return "hospitalhome";
    } else {
      return "/";
    }
  };

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand id="navbar-brand">
              <NavLink to={getrefreshurl()} tag={Link}>
                Blood Distribution
              </NavLink>
            </NavbarBrand>

            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              {urlname === "bbhome" && (
                <>
                  <NavItem>
                    <NavLink
                      to={{
                        pathname: "/bloodintake",
                        // form vla page banane ka h
                        // hospital home
                        // aboutProps: {
                        //   name: "Blood bank",
                        // },
                      }}
                      tag={Link}
                    >
                      Blood Intake Page
                    </NavLink>
                  </NavItem>
                </>
              )}
              {(urlname === "bbhome" || urlname === "hhome") && (
                <NavItem>
                  <NavLink
                    to={{
                      pathname: "/",
                      aboutProps: {
                        name: "Blood bank",
                      },
                    }}
                    onClick={logout}
                    tag={Link}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              )}

              {(urlname === "landing" || urlname === "login" || urlname === "timeline") && (
                <>
                  <NavItem>
                    <NavLink
                      to={{
                        pathname: "/timeline",
                      }}
                      tag={Link}
                    >
                      Track
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to={{
                        pathname: "/login",
                        aboutProps: {
                          name: "Blood bank",
                        },
                      }}
                      tag={Link}
                    >
                      Login as Blood bank
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to={{
                        pathname: "/login",
                        aboutProps: {
                          name: "Hospital",
                        },
                      }}
                      tag={Link}
                    >
                      Login as Hospital
                    </NavLink>
                  </NavItem>
                </>
              )}
              <NavItem>
                <NavLink id="twitter-tooltip">
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink id="facebook-tooltip">
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink id="instagram-tooltip">
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;

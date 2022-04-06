/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a href="/">Back to Top</a>
              </li>
              <li>
                <a href="/">About Us</a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            Learn More about {" "}
            <a href="https://en.wikipedia.org/wiki/Blockchain" target="_blank">
            Blockchain
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;

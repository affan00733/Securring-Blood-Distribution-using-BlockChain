import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader(props) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        try {
          pageHeader.current.style.transform =
            "translate3d(0," + windowScrollTop + "px,0)";
        } catch (e) {}
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg1.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src='https://picsum.photos/200'></img>
          </div>
          <h3 className="title">{props.name}</h3>
          <p className="category">{props.bloodcount === {} && "Current blood count status"}</p>
          <div className="row">
            {Object.entries(props.bloodcount).map(([key, value], i) => (
              <>
                {/* <div className="social-description" style={{display: 'flex', flexDirection: 'row'}}>
                  <h2>{value}</h2>
                  <p>{key}</p>
                </div> */}

                <div className="ml-auto mr-auto my-5">
                  <div
                    className="p-3"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      borderBottomLeftRadius: "10px",
                      borderTopLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                      borderTopRightRadius: "10px",

                      maxHeight: "100px",
                      minWidth: "100px",
                    }}
                  >
                    <h2 className="font-weight-bold mb-1">{value}</h2>
                    <p className="font-weight-bold">{key}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <h3 className="category">{""}</h3>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;

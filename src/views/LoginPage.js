import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import BlockchainContext from "../context/BlockChainContext";
import globalContext from "../context/GlobalContext";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/ExamplesNavbar.js";

function LoginPage(props) {
  const { web3, accounts, contract } = useContext(BlockchainContext);
  const { SET_USER } = useContext(globalContext);

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  const history = useHistory();
  const [email_in, setEmail_in] = React.useState("");
  const [pass_in, setPass_in] = React.useState("");


  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  // agar null rhega toh it will login as blood bank
  try {
    var n = props.location.aboutProps["name"];
    console.log(n);
  } catch (e) {
    props.location.aboutProps = {};
    props.location.aboutProps["name"] = "Blood bank";
  }

  const populate_data = async (e) => {
    console.log("log", typeof accounts[0]);
    let d = [
      {
        name: "Vijayee Blood Bank",
        id: "0x50a7d6b1c2d2be342919982bcd198e40ebbd6395",
        email: "bb1@gmail.com",
        pass: "1234",
        type: "1", // Blood bank
        add: "Sector 22, Nerul, Navi Mumbai, Maharashtra 400706",
        no: "+91 8446417448",
        loc: "19.031413,73.016422",
      },
      {
        name: "Prabodhan Blood Bank",
        id: "0xca495e49e5e6fdeed031c1d04efbfd8b2a1cad74",
        email: "bb2@gmail.com",
        pass: "1234",
        type: "1", // Blood bank
        add: "Piramal Nagar, Goregaon West, Mumbai, Maharashtra 400104",
        no: "+91 8446417448",
        loc: "19.159587,72.845633",
      },
      {
        name: "Ridhi sidhi Blood Bank",
        id: "0x85ea4151aa1edcfa0d5f1d8e3628f1f997941e4f",
        email: "bb3@gmail.com",
        pass: "1234",
        type: "1", // Blood bank
        add: "Sector 8, Nerul, Navi Mumbai, Maharashtra 400706",
        no: "+91 8446417448",
        loc: "19.043413,73.015516",
      },
      {
        name: "Bloodline Blood Bank",
        id: "0x7a2b54f0e6ccf7a48c99d9d306c79b2e1421b5f8",
        email: "bb4@gmail.com",
        pass: "1234",
        type: "1", // Blood bank
        add: "Dr Ambedkar Rd, Thane West, Thane, Maharashtra 400601",
        no: "+91 8446417448",
        loc: "19.200753,72.974882",
      },
      {
        name: "Samarpan Blood Centre",
        id: "0xa715d4f56c4ed7fb1a712933c48c84566b44be68",
        email: "bb5@gmail.com",
        pass: "1234",
        type: "1", // Blood bank
        add: "Lal Bahadur Shastri Rd, Ghatkopar West, Mumbai, Maharashtra 400086",
        no: "+91 8446417448",
        loc: "19.09339,72.913659",
      },
    ];
    for (var i = 0; i < d.length; i++) {
      if (d[i]["id"] === accounts[0]) {
        try {
          await contract.methods
            .addidentity(
              d[i]["name"],
              accounts[0],
              d[i]["email"],
              d[i]["pass"],
              d[i]["type"],
              d[i]["add"],
              d[i]["no"],
              d[i]["loc"]
            )
            .send({ from: accounts[0] });

          var ad = await contract.methods.getUserCount().call();
          console.log(ad);
        } catch (err) {
          console.log("Error in creation", err);
        }
      }
    }

    // creating hospital account
    // try {
    //   await contract.methods
    //     .addidentity(
    //       "ANKUR MULTISPECIALITY HOSPITAL",
    //       '0x73143Bc2Ac1b35a735628F7296bd6FF79bA6e77b',
    //       'hsp@gmail.com',
    //       '1234',
    //       "0", //hospital
    //       "RB2 Central Railway Quarters, Jain Society, Sion, Mumbai",
    //       "+91 8446417448",
    //       "19.036607,72.860112"
    //     )
    //     .send({ from: accounts[0] });

    //   var ad1 = await contract.methods.getUserCount().call();
    //   console.log(ad1);
    // } catch (err) {
    //   console.log("Error in creation", err);
    // }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    var account_data1 = await contract.methods.getUserCount().call();
    console.log(account_data1);

    if (email_in.trim() !== "" && pass_in.trim() !== "") {
      try {
        var account_data = await contract.methods
          .getLogin(accounts[0], email_in.toString(), pass_in.toString())
          .call();

        var current_user = {
          name: account_data[0],
          email: email_in.toString(),
          type: account_data[1],
          add: account_data[2],
          no: account_data[3],
          location: account_data[4],
        };
        // console.log(current_user);
        SET_USER(current_user);

        if (props.location.aboutProps["name"] === "Blood bank") {
          history.push("/bloodbankhome");
        } else {
          history.push("/hospitalhome");
        }
      } catch (err) {
        console.log("Error in creation", err);
      }
    } else {
      alert(`${"Enter Valid credentials"}`);
    }
  };

  return (
    <>
      <ExamplesNavbar urlname="login" />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/login1.jpg").default + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png").default}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email ID  ..."
                        type="email"
                        name="email"
                        value={email_in}
                        onChange={(event) => setEmail_in(event.target.value)}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="password ..."
                        type="password"
                        name="password"
                        value={pass_in}
                        onChange={(event) => setPass_in(event.target.value)}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      onClick={formSubmit}
                      // onClick={populate_data}
                      // onClick={async (event) => {
                      //   var ad = await contract.methods.getUserCount().call();
                      //   console.log(ad);
                      // }}
                    >
                      Login as {props.location.aboutProps["name"]}
                    </Button>

                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

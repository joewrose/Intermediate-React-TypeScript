import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { PetAPIResponse, Pet, Animal } from "./APIResponseTypes";

// Since we expect the component to get a props object, we have to
// define this. But we can't be sure if the API is going to return an ID
// or not, so we put a ? next to the id type to denote this.

interface Props {
  params: {
    id?: string;
  };
}

class Details extends Component<Props> {
  // We can get rid of many of the typescript related errors we originally got
  // when converting this page by setting the default values for all our
  // variables. TypeScript is clever enough that it can work out our variable
  // types from this alone.
  state = {
    loading: true,
    showModal: false,
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
  };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    // Since the res.json returns an 'any' type, we should type is to
    // be a PetAPIResponse object.
    const json = (await res.json()) as PetAPIResponse;
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams<{ id: string }>();
  return (
    <ErrorBoundary>
      <Details params={params} />;
    </ErrorBoundary>
  );
};

export default WrappedDetails;

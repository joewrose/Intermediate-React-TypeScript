import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // We use an arrow function here because it doesn't create a
  // new context within the function, this means that we are still
  // able to access the 'this' object.

  // Event-target refers to the image which fired the event, in
  // this case the image that was clicked on. The dataset refers
  // to the metadata within the event-target and the index refers
  // to the specific piece of metadata

  // We've used a unary '+' to convert our data to a number
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  // This function gives an accessibility error, the reason we are
  // getting this is because you can't tab onto this element. The
  // correct way to do this would be to wrap it in an invisible
  // button.
  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              key={photo}
              src={photo}
              // Refered to by dataset.index
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Animal Shell</h1>
            </div>
        )
    }
}

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="enter name of animal" value={this.props.name} onChange={this.props.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="species">Species</label>
                    <input type="text" className="form-control" id="species" placeholder="enter species" value={this.props.species} onChange={this.props.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="breed">Breed</label>
                    <input type="text" className="form-control" id="breed" placeholder="enter breed" value={this.props.breed} onChange={this.props.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="sex">Sex</label>
                    <input type="text" className="form-control" id="sex" placeholder="enter sex" value={this.props.sex} onChange={this.props.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" className="form-control" id="age" placeholder="enter age" value={this.props.age} onChange={this.props.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="text" className="form-control" id="image" placeholder="enter image url" value={this.props.image} onChange={this.props.handleChange} />
                </div>

                <div class="form-group form-check">
                    <input type="checkbox" className="form-check-input" checked={this.props.adopted} onChange={this.props.toggleCheck} />
                    <label className="form-check-label" htmlFor="adopted">Adopted</label>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        )
    }
}

class Table extends React.Component {
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Species</th>
                        <th scope="col">Breed</th>
                        <th scope="col">Image</th>
                        <th scope="col">Age</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Adopted</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.animal.map((item, index) => {
                        return (
                            <Row index={index} animal={item} />
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

class Row extends React.Component {
    render() {
        return (
            <React.Fragment>
                <tr>
                    <th scope="row">{this.props.index}</th>
                    <td>{this.props.animal.name}</td>
                    <td>{this.props.animal.species}</td>
                    <td>{this.props.animal.breed}</td>
                    <td><img src={this.props.animal.image} /></td>
                    <td>{this.props.animal.age}</td>
                    <td>{this.props.animal.sex}</td>
                    <td>{this.props.animal.adopted? "True" : "False"}</td>
                </tr>
            </React.Fragment>
        )
    }
}
class Footer extends React.Component {

}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            species: '',
            breed: '',
            sex: '',
            age: 0,
            image: '',
            adopted: true,
            animal: []
        }
    }

    toggleCheck = () => {
        this.setState({
            adopted: !this.state.adopted
        })
    }
    // handle Change
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    // handle submit
    handleSubmit = (event) => {
        event.preventDefault();
        fetch("/animal", {
            body: JSON.stringify({
                name: this.state.name,
                species: this.state.species,
                breed: this.state.breed,
                sex: this.state.sex,
                age: this.state.age,
                image: this.state.image,
                adopted: this.state.adopted
            }),
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
            .then(createdAnimal => {
                return createdAnimal.json();
            })
            .then(jsonedAnimal => {
                // reset the form
                // add person to list
                this.setState({
                    name: '',
                    species: '',
                    breed: '',
                    sex: '',
                    age: 0,
                    image: '',
                    adopted: false,
                    animal: [jsonedAnimal, ...this.state.animal]
                });
                console.log(jsonedAnimal);
            })
            .catch(error => console.log(error));
    }

    // Show data
    componentDidMount() {
        fetch('/animal')
            .then(response => response.json())
            .then(animal => {
                this.setState({
                    animal: animal
                })
                console.log(this.state.animal)
            })
    }

    render() {
        const { name, species, breed, sex, age, image, adopted } = this.state;
        return (
            <React.Fragment>
                <Header />
                <Form name={name}
                    species={species} breed={breed}
                    sex={sex} age={age} image={image}
                    adopted={adopted}
                    toggleCheck={this.toggleCheck}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />

                <Table animal={this.state.animal} />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.querySelector(".container"));
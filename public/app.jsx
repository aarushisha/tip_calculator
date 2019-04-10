class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      costs: [],
    }
    this.submitTip = this.submitTip.bind(this);
    this.getTips = this.getTips.bind(this);
  }

  componentDidMount() {
    this.getTips();
  }

  getTips() {
    fetch('/getTips').then(data => data.json())
    .then(tips => this.setState({
      costs: tips
    }))
    .catch(error => console.log(error))
  }
  



  submitTip() {
    var name = document.getElementById('costName').value;
    var price = parseFloat(document.getElementById('cost').value);
    var percents = document.getElementsByName('percent');

    for (var i = 0; i < percents.length; i++) {
      if (percents[i].checked === true) {
        var percent = parseInt(percents[i].id);
      }
    }
    fetch('/submitTip', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: name, price: price, percent: percent})
    }).then( data => data.json())
    .then (data => console.log(data))
    .then(() => this.getTips())
  }

  render() {
    return (
      <div>
      <form>
      <div>Calculate Tip!</div>
      <input id='costName' type='text' defaultValue="Name"></input>
      <br></br>
      <input id='cost' type="text" defaultValue="Price" maxLength = "6"size="6"></input>
      <br></br>
      <div>
      <input id='15' type="radio" name="percent"></input>
      <label htmlFor="15">15%</label>
      <input id='18' type="radio" name="percent"></input>
      <label htmlFor="18">18%</label>
      <input id='20' type="radio" name="percent"></input>
      <label htmlFor="20">20%</label>
      <input id='25' type="radio" name="percent"></input>
      <label htmlFor="25">25%</label>
      </div>
      </form>
      <br></br>
      <input id='calculate' type="submit" value="Calculate Tip!" onClick={() => this.submitTip()}></input>
      <div>Tip:         Total:         </div>
      <TipTable costs={this.state.costs}/>
      </div>
    )
  }
}

const TipTable = (props) => {
    return (
      <div>
      <div>Stored Tips</div>
      {props.costs.map( cost => <div>{cost.name} {cost.price} {cost.tip}</div>
        )}
      </div>
    )
}


ReactDOM.render(<Calculator />, document.getElementById('root'));
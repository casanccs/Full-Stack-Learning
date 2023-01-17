import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let json = 
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
  {category: "Sporting Goods", price: "$169.69", stocked: false, name: "GoobTron"}
];
let categories = [];
for (const obj of json){
  if (categories.includes(obj.category)){
    continue;
  }
  categories.push(obj.category);
}
//Now we have all unique categories

class FilterableProductTable extends React.Component{
  constructor(props){
      super(props);

      this.state = {filterText: '', inStockOnly: false};
      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.handleStockChange = this.handleStockChange.bind(this);
  }

  handleFilterChange(filterText){
    this.setState({filterText: filterText});
  }
  handleStockChange(inStockOnly){
    this.setState({inStockOnly: inStockOnly});
  }

  render(){
      return (
          <div>
            <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onFilterChange={this.handleFilterChange} onStockChange={this.handleStockChange}/>
            <ProductTable filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}/>
          </div>
      );
  }
}

class SearchBar extends React.Component{
  constructor(props){
      super(props);
      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.handleStockChange = this.handleStockChange.bind(this);
  }
  handleFilterChange(e){
    this.props.onFilterChange(e.target.value);
  }
  handleStockChange(e){
    this.props.onStockChange(e.target.checked);
  }
  render(){
      return(
          <form>
            <input type="text" value={this.props.filterText} onChange={this.handleFilterChange}/>
            <br></br>
            <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleStockChange}/>
            Only show products in stock
          </form>
      );
  }
}

class ProductTable extends React.Component{
  render(){
      let tryTwo = [];
      let count = 0;
      for (const category of categories){
        tryTwo.push(<ProductCategoryRow category={category} key={count.toString()}/>)
        count++;
        for (const obj of json){
          if (obj.category === category){
            if ((this.props.inStockOnly && obj.stocked) || !this.props.inStockOnly){
              if (this.props.filterText === '' || (obj.name.includes(this.props.filterText))){
                tryTwo.push(<ProductRow name={obj.name} price={obj.price} stocked={obj.stocked} key={count.toString()}/>)
                count++;
              }
            }
          }
        }
      }
      this.tryTwo = tryTwo;
      return(
          <table>
            <thead>
              <tr><th>Name</th><th>Price</th></tr>
            </thead>
            <tbody>
              {this.tryTwo}
            </tbody>
          </table>
      );
  }
}

class ProductCategoryRow extends React.Component {
  constructor(props){
      super(props);
  }

  render(){
      return(
          <tr><th>{this.props.category}</th></tr>
      );
  }
}

class ProductRow extends React.Component {
  constructor(props){
      super(props);
  }

  render(){
      if (this.props.stocked) {
        return <tr><td>{this.props.name}</td><td>{this.props.price}</td></tr>
          }
      else {
        return <tr><td style={{color: "#FF0000"}}>{this.props.name}</td><td>{this.props.price}</td></tr>
      }
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FilterableProductTable json={json}/>);
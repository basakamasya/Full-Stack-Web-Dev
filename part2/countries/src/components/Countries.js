const Countries = (props) =>       
<ul>
  {props.countriesToShow.map(country => 
          <li key={country.name.official}> 
            {country.name.official}      
            <button onClick={() => 
              props.showCountry(country)}>show</button>
          </li> )}
</ul>

export default Countries
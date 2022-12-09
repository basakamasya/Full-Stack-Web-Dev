const SingleCountry = (props) =>   
<>
  {props.countriesToShow.map(country => 
    <div key={country.name.common}>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <b>languages</b>

      <ul>
      {Object.values(country.languages).map(language => 
              <li key={language}> {language} </li> )}
      </ul>

    <p>{country.flag}</p>
    </div>  
  )}

</>

export default SingleCountry
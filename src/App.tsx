import { Stack, TextInput } from '@mantine/core'
import './App.css'
import { Select } from './components/Select'
import { useEffect, useState } from 'react'
import { BASE_URL } from './utils/helper'

function App() {


  const [country, setCountry] = useState<any>([])
  const [currentCountry, setCurrentCountry] = useState("RUB")
  const [currentValue, setCurrentValue] = useState(0)
  const [convertValue, setConvertValue] = useState(1)
  const [convertCountry, setConvertCountry] = useState("TJS")
  const [convertValueCountry , setConvertValueCountry] = useState<any>(0)

  useEffect(()=>{
      fetch(BASE_URL+"codes").then((response)=> response.json()).then(({supported_codes})=> {
        const countryEntries = supported_codes.map(([code, country]:any) => ({value: code, label: country}))
        setCountry(countryEntries)})
  },[]) 

  useEffect(()=>{
    if(currentCountry){
      fetch(BASE_URL+`latest/${currentCountry}`).then((response)=> response.json()).then(({conversion_rates})=> {
        const result = conversion_rates[convertCountry]
        setConvertValueCountry(result)
      })
    }
},[currentCountry, convertCountry]) 

useEffect(()=>{
  const convertToCurentValue = (currentValue * convertValueCountry).toFixed(2)
  console.log(convertToCurentValue);
  
  setConvertValue(Number(convertToCurentValue))
})

  

  return (
    <Stack style={{width:"100%"}}>
      Курс валют
     <TextInput
      type="number"
      placeholder="1000"
      value={currentValue}
      onChange={(e: any)=> setCurrentValue(e.target.value)}
      rightSection={<Select value={currentCountry} onChange={(e: any)=> setCurrentCountry(e.target.value)}
      data={country}/>}
      rightSectionWidth={150}
    />
   <TextInput
      type="number"
      placeholder="1000"
      value={convertValue}
      rightSection={<Select value={convertCountry} onChange={(e: any)=> setConvertCountry(e.target.value)}
      data={country}/>}
      rightSectionWidth={150}
    />
    </Stack>
  )
}

export default App

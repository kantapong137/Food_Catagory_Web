import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {Image} from 'semantic-ui-react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.css';

import ReadMoreReact from 'read-more-react';
import './fonts/Prompt-ExtraLight.ttf';

import logo2 from './logo2.png';
import line from './line.png';

export default function App() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    
    useEffect(() => {
        axios.get(`http://localhost:9000/trips`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])
      
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    return (
        <div>
            <Image src={logo2}  style={{width: '50%', marginLeft:460}} alt="Logo2"/><br/>
            <input style={{textAlign: 'center', border:'none', marginLeft:850, background: 'transparent', outline: 'none'}} icon='search' placeholder='Search...' onChange={(e) => searchItems(e.target.value)}/><br/>
            <Image src={line}  style={{width: '700px', height: '5px', marginLeft:590}} alt="Logo2"/>
                {searchInput.length > 2 ? (
                    //for search(after search)
                    filteredResults.map((item) => {
                        return (
                            <Container style={{width: '55%', marginTop:50}}>
                                <Row >
                                    <Col sm={3} style={{paddingBottom: 50}}>
                                        <Image src={item.photos[0]}  style={{width: '240px', height: '320px', borderRadius:40}} />
                                    </Col>
                                    <Col sm={9}>
                                        <a style={{textDecoration: 'none'}} href={item.url}><h2 style={{color: 'black', fontWeight: 'bold', fontFamily:'Prompt-ExtraLight'}}>{item.title}</h2></a>
                                        <span style={{fontFamily:'Prompt-ExtraLight'}} >
                                            <ReadMoreReact text={item.description}
                                                min={80}
                                                ideal={100}
                                                max={200}
                                                readMoreText= {<span><a style={{textDecoration: 'none', color: '#38B6FF', fontFamily:'Prompt-ExtraLight'}} href={item.url}>อ่านต่อ...</a></span>}/>
                                            <p>
                                                <span>หมวด: </span>
                                                    {item.tags.map((item)=>{
                                                        return <button style={{background: 'none',border: 'none', textDecorationLine: 'underline'}} onClick={() => searchItems(item)}>{item}</button>
                                                    })}
                                            </p>
                                        </span>
                                        <span>
                                            <Image src={item.photos[1]}  style={{width: '100px', height: '100px',  marginRight: '10px', borderRadius:15}} />
                                            <Image src={item.photos[2]}  style={{width: '100px', height: '100px',  marginRight: '10px', borderRadius:15}} />
                                            <Image src={item.photos[3]}  style={{width: '100px', height: '100px', borderRadius:15}}/>
                                        </span>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    })
                ) : (
                    //for main(before search)
                    APIData.map((item) => {
                        return (
                            <Container style={{width: '55%', marginTop:50}}>
                                <Row >
                                    <Col sm={3} style={{paddingBottom: 50}}>
                                        <Image src={item.photos[0]}  style={{width: '240px', height: '320px', borderRadius:40}} />
                                    </Col>
                                    <Col sm={9}>
                                        <a style={{textDecoration: 'none'}} href={item.url}><h2 style={{color: 'black', fontWeight: 'bold', fontFamily:'Prompt-ExtraLight'}}>{item.title}</h2></a>
                                        <span style={{fontFamily:'Prompt-ExtraLight'}} >
                                            <ReadMoreReact text={item.description}
                                                min={80}
                                                ideal={100}
                                                max={200}
                                                readMoreText= {<span><a style={{textDecoration: 'none', color: '#38B6FF', fontFamily:'Prompt-ExtraLight'}} href={item.url}>อ่านต่อ...</a></span>}/>
                                            <p>
                                                <span>หมวด: </span>
                                                    {item.tags.map((item)=>{
                                                        return <button style={{background: 'none',border: 'none', textDecorationLine: 'underline'}} onClick={() => searchItems(item)}>{item}</button>
                                                    })}
                                            </p>
                                        </span>
                                        <span>
                                            <Image src={item.photos[1]}  style={{width: '100px', height: '100px',  marginRight: '10px', borderRadius:15}} />
                                            <Image src={item.photos[2]}  style={{width: '100px', height: '100px',  marginRight: '10px', borderRadius:15}} />
                                            <Image src={item.photos[3]}  style={{width: '100px', height: '100px', borderRadius:15}}/>
                                        </span>
                                    </Col>
                                </Row>
                            </Container>
                        )
                    })
                )}
        </div>
    )
}

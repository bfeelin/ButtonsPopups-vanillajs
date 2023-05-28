// see https://repl.it/@Dotdash/Goodreads-Server-Express for implementation details  
const template = document.createElement("template")
template.innerHTML = `
    <style>
     .book-item-container{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        max-width: 550px;
        border: 3px solid gray;
        margin: 0.5rem;
        border-radius: 4px;
      }
      .book-info-container{
        display: flex;
        flex-direction: column;
        margin: 1rem;
      }
      .book-info-container p{
        font-style: italic;
        margin: 8px;
      }
      
      .book-info-container h3{
        magin: 8px; 
      }
      
      .book-info-container img{
        width: 100px;
      }
    </style>
  <div id='book-item' class='book-item-container'>
    <slot name='imageUrl'></slot>
    <div class='book-info-container'>
      <h3><slot name='title'></slot></h3>
      <p><slot name='authorName'></slot></p>
    </div>
  </div>
`
customElements.define(
  "book-item",
  class BookItem extends HTMLElement{
    constructor(){
      super()
        const shadow = this.attachShadow({ mode: "open"})
        shadow.appendChild(template.content.cloneNode(true));
    } 
  }
)

function searchBooks() {
    var searchTerm = document.querySelector('.search-input').value;
    var key = ''
    var secret = ''
    var apiUrl = `https://goodreads-server-express--dotdash.repl.co/search/${searchTerm}?key=${key}&secret=${secret}`;
      
     document.getElementById('search-button').setAttribute('disabled', '')
     var resultsContainer = document.querySelector('.results-container');
     resultsContainer.innerHTML = 'Loading...';

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        console.log(data)
          var resultsContainer = document.querySelector('.results-container');
          resultsContainer.innerHTML = '';
          
          data.list.forEach(book => {
            var bookItem = document.createElement(`book-item`);
            bookItem.innerHTML = `
                <span slot="title">${book.title}</span>
                <span slot="imageUrl"><img alt="${book.title}-picture" src="${book.imageUrl}"/></span>
                <span slot="authorName">${book.authorName}</span>
            `
            resultsContainer.appendChild(bookItem);
          });
        })
        .catch(error => {
          console.error('Error:', error);
          var resultsContainer = document.querySelector('.results-container');
          resultsContainer.innerHTML = 'Error getting books';
        })
        .finally( 
          setTimeout(() => {            
            document.getElementById('search-button').removeAttribute('disabled')
          }, 400)
             
        )
 }
    

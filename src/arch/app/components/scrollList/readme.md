# ScrollList

```javascript
    <ScrollList className="datas"
       
        ListItemTemplate={this.props.ListItemTemplate}
        fetchUrl={'/aj/demo'}
        
        listData={list}
        done={listSet[activeTab].done}
        scrollDownPage={()=>{}}
        dragDown={()=>{}}
    />
```
## Unfetch mode(Controlled)
* When u use the Unfetch mode, the data is kept by its parent component. 
* ScrollList will throw out two event for user to **load more** or **reset list** 

| props| type| |
| ------------- |:-------------:|:-------------:|
| ListItemTemplate | function |required| 
| listData | Array |required| 
| done | bool | required| 
| scrollDownPage | function | required| 
| dragDown | function |required| 

```javascript
    <ScrollList className="datas"
        ListItemTemplate={this.props.ListItemTemplate}
        
        listData={list}
        done={listSet[activeTab].done}
        scrollPage={()=>{}}
        dragDown={()=>{}}
    />
```
## Fetch mode(Uncontrolled)
* When u use the Fetch mode, you need to pass the **dataUrl** to ScrollList. 
* And ScrollList will **load** or **reset** list data by itself

| props| type| |
| ------------- |:-------------:|:-------------:|
| fetchUrl | string |required| 
| ListItemTemplate | function |required| 
| model | function |selectable| 


```javascript
    <ScrollList className="datas"
        ListItemTemplate={this.props.ListItemTemplate}
        fetchUrl={'/aj/demo'}
    />
```
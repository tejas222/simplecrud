import React, { Component } from 'react';

export default class ClassBased extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Course List',
      act: 0,
      index: '',
      datas: [],
    };
  }

  form = document.getElementById('form');

  componentDidMount() {
    this.refs.name.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let duration = this.refs.duration.value;
    let description = this.refs.description.value;
    if (name === '' || duration === '' || description === '') {
      alert('Please input required data');
    } else if (this.state.act === 0) {
      //new
      let data = {
        name,
        duration,
        description,
      };
      datas.push(data);
    } else {
      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].duration = duration;
      datas[index].description = description;
    }

    this.setState({
      datas: datas,
      act: 0,
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas,
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.duration.value = data.duration;
    this.refs.description.value = data.description;

    this.setState({
      act: 1,
      index: i,
    });

    this.refs.name.focus();
  };

  render() {
    let datas = this.state.datas;
    return (
      <div>
        <div className='container'>
          <form action='' ref='myForm' id='form'>
            <div className='col-md-6 d-flex justify-content-center flex-column py-4 m-auto'>
              <h2 className='text-center'>{this.state.title} </h2>
              <div class='mb-3'>
                <input
                  type='name'
                  class='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Course Name'
                  ref='name'
                  required='required'
                />
              </div>
              <div class='mb-3'>
                <input
                  type='duration'
                  class='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Course Duration'
                  ref='duration'
                />
              </div>
              <div class='mb-3'>
                <textarea
                  class='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  placeholder='Course Description'
                  ref='description'
                ></textarea>
              </div>
              <input
                type='submit'
                className='btn btn-success'
                value='Submit'
                onClick={(e) => this.fSubmit(e)}
              />
            </div>
          </form>

          <div className='col-md-6 m-auto'>
            <table className='table'>
              <tr>
                <th>Course Name</th>
                <th>Course Duration</th>
                <th>Course Description</th>
                <th></th>
              </tr>
              {datas.map((data, i) => (
                <tr>
                  <td key={i}>{data.name}</td>
                  <td key={i}>{data.duration}</td>
                  <td key={i}>{data.description}</td>
                  <td>
                    <a href='#' onClick={() => this.fRemove(i)}>
                      <i class='fas fa-trash-alt'></i>
                    </a>
                    <a href='#' onClick={() => this.fEdit(i)}>
                      <i class='fas fa-pencil-alt'></i>
                    </a>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

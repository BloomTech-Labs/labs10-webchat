import React from 'react';

class RepRecord extends React.Component {
  constructor() {
    super();
    this.state = {
      test: ''
    }
  }

  render() {
    return (
      <div className="Rep-Record">
        <TableRow key={reps.id}>

          <TableCell component="th" scope="row">
            {reps.name}
          </TableCell>

          <TableCell>{reps.email}</TableCell>

          <TableCell>
            <Checkbox
            checked={this.state.admin}
            onChange={this.handleChange}
            onClick={this.changeAdminStatus}
            />
          </TableCell>

          <TableCell>
            <IconButton onClick={this.handleClick}>
              <DeleteIcon/>
            </IconButton>	
          </TableCell>

        </TableRow>
      </div>
    )
  }
}

export default RepRecord;
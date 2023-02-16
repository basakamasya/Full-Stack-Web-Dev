const User = ({ users }) => {
  if (users) {
    return (
      <div>
        <h1>Users</h1>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td><h3>blogs created</h3></td>
            </tr>
            {users.map((u) => (
              <tr key={u.name}>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

  }

}

export default User
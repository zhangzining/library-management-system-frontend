export default function OtherDetail({item}: { item: BookInfoDto }) {
  /**
   * 生成图书位置的表格行，内嵌p标签实现一格多行
   */
  const getLocations = (item: BookInfoDto) => {
    return (
      <tr>
        <td className="align-top">位置：</td>
        {
          (item.locations && item.locations.length > 0) ? (
            <td>
              {
                item.locations.map(location => (
                  <p key={item.locations.indexOf(location)}>
                    {
                      location.description
                    }
                  </p>
                ))
              }
            </td>
          ) : (
            <td>暂未上架</td>
          )
        }
      </tr>
    )
  }

  return (
    <div className='w-full block p-2'>
      <table className='table-auto'>
        <tbody>
        <tr>
          <td>索书号：</td>
          <td>{item.indexNumber}</td>
        </tr>

        <tr>
          <td>可借本数：</td>
          <td>{item.availableReplicationAmount}</td>
        </tr>

        {
          getLocations(item)
        }
        </tbody>
      </table>
    </div>
  )
}
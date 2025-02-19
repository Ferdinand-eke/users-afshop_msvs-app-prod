import React from "react";

 function RecommendedHead({ title, color }) {
  return (
    <div className={`${color} p-3 rounded-t-lg text-xl text-white uppercase`}>
      {title}
    </div>
  );
}

export default RecommendedHead
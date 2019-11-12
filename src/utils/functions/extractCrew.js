export const getCrewMembers = (crew, department, job = ['']) => {
  const crewMembers = new Array(job.length).fill([]);

  const evaluateJob = (crew, element) => job[0].length > 0 ? crew.toLowerCase() === element.toLowerCase() : true;

  job.forEach((element, index) => {
    crewMembers[index] = crew.filter(crew => crew.department.toLowerCase() === department.toLowerCase() && evaluateJob(crew.job, element));

    crewMembers[index] = crewMembers[index].reduce((accumulator, current) => {
      if (accumulator.length > 1) {
        const index = accumulator.map(a => a.name).findIndex(e => e.toLowerCase() === current.name.toLowerCase())
        const isExisting = index !== -1;
        if (isExisting) {
          accumulator[index].job = `${accumulator[index].job}, ${current.job}`;
          return accumulator;
        }
        return accumulator.concat([current]);
      }
      return accumulator.concat([current]);
    }, []);
  });


  return crewMembers;
};

export const getCrewCount = (crew, department) => {
  const departmentCrew = crew.filter(crew => crew.department.toLowerCase() === department.toLowerCase());
  return departmentCrew.length;
};

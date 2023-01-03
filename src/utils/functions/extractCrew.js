export const getCrewMembers = (crew, department, job = [""]) => {
  const crewMembers = new Array(job.length).fill([]);

  const evaluateJob = (crew, element) =>
    job[0].length > 0 ? crew.toLowerCase() === element.toLowerCase() : true;

  job.forEach((element, index) => {
    crewMembers[index] = crew.filter(
      (crew) =>
        crew.department.toLowerCase() === department.toLowerCase() &&
        evaluateJob(crew.job, element)
    );

    crewMembers[index] = crewMembers[index].reduce((accumulator, current) => {
      const index = accumulator
        .map((a) => a.id)
        .findIndex((e) => e === current.id);
      const isExisting = index !== -1;
      if (isExisting) {
        accumulator[index].job = `${accumulator[index].job}, ${current.job}`;
        return accumulator;
      }
      return accumulator.concat([current]);
    }, []);
  });

  return crewMembers;
};
